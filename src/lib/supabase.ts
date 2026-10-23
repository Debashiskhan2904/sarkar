import { createClient } from '@supabase/supabase-js';
import { generateSecureHashedFileName, validateFileMagicBytes } from './security';

export const SUPABASE_URL = 
  (import.meta as any).env?.VITE_SUPABASE_URL || 'https://wgfzigyajmbeggbiukqh.supabase.co';
export const SUPABASE_ANON_KEY = 
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_dJs1lIjpIEj9DqGMdGB-fQ_vCP_0DPy';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const BUCKET_NAME = 'media';

export const MAX_FILE_SIZE_MB = 50;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 52,428,800 bytes

/**
 * Uploads a file (photo, video, audio, certificate, resume) securely to Supabase Storage
 * with magic-byte binary header validation and clean randomized cryptographic name hashing.
 * Rejects any file exceeding 50 MB.
 */
export async function uploadToSupabase(
  file: File | Blob, 
  folder: 'photos' | 'videos' | 'audios' | 'certificates' | 'resumes' | 'general' = 'general',
  originalFileName?: string,
  skipSignatureCheck = false
): Promise<{ url: string; secureFileName?: string; error?: string }> {
  try {
    // 0. Enforce strict 50 MB maximum size limit
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return {
        url: '',
        error: `File size (${sizeMB} MB) exceeds maximum allowed limit of ${MAX_FILE_SIZE_MB} MB. Upload was rejected.`
      };
    }

    const rawName = originalFileName || (file instanceof File ? file.name : `media_${Date.now()}.bin`);
    
    // 1. Validate magic bytes if it is a user-provided File
    if (!skipSignatureCheck && file instanceof File) {
      const allowedCat = folder === 'photos' ? ['image'] :
                         folder === 'videos' ? ['video'] :
                         folder === 'audios' ? ['audio'] :
                         folder === 'resumes' ? ['document'] :
                         folder === 'certificates' ? ['image', 'document'] :
                         ['image', 'video', 'audio', 'document'];
      
      const validation = await validateFileMagicBytes(file, allowedCat as any);
      if (!validation.valid) {
        return { url: '', error: validation.error || 'Invalid file binary format' };
      }
    }

    // 2. Cryptographic clean file name hashing
    const secureName = generateSecureHashedFileName(rawName, folder.slice(0, 4));
    const path = `${folder}/${secureName}`;

    // Resolve accurate content-type so browser renders image/video correctly
    let determinedContentType = file.type;
    if (!determinedContentType || determinedContentType === 'application/octet-stream') {
      const lowerRaw = rawName.toLowerCase();
      if (/\.(jpe?g|jfif)$/i.test(lowerRaw)) determinedContentType = 'image/jpeg';
      else if (/\.png$/i.test(lowerRaw)) determinedContentType = 'image/png';
      else if (/\.webp$/i.test(lowerRaw)) determinedContentType = 'image/webp';
      else if (/\.gif$/i.test(lowerRaw)) determinedContentType = 'image/gif';
      else if (/\.svg$/i.test(lowerRaw)) determinedContentType = 'image/svg+xml';
      else if (/\.bmp$/i.test(lowerRaw)) determinedContentType = 'image/bmp';
      else if (/\.(avif|heic|heif)$/i.test(lowerRaw)) determinedContentType = 'image/jpeg';
      else if (/\.mp4$/i.test(lowerRaw)) determinedContentType = 'video/mp4';
      else if (/\.webm$/i.test(lowerRaw)) determinedContentType = 'video/webm';
      else if (/\.mp3$/i.test(lowerRaw)) determinedContentType = 'audio/mpeg';
      else if (/\.pdf$/i.test(lowerRaw)) determinedContentType = 'application/pdf';
      else if (folder === 'photos') determinedContentType = 'image/jpeg';
    }

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: determinedContentType || undefined
      });

    if (uploadError) {
      console.warn('Supabase upload warning:', uploadError.message);
      return { url: '', error: uploadError.message };
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
    return { url: data.publicUrl, secureFileName: secureName };
  } catch (err: any) {
    console.error('Supabase upload exception:', err);
    return { url: '', error: err?.message || 'Upload failed' };
  }
}

/**
 * Permanently deletes a file from Supabase Storage by public URL or relative storage path.
 */
export async function deleteFromSupabase(fileUrlOrPath: string): Promise<boolean> {
  if (!fileUrlOrPath) return false;
  try {
    let filePath = fileUrlOrPath;
    if (filePath.includes('/storage/v1/object/public/' + BUCKET_NAME + '/')) {
      filePath = filePath.split('/storage/v1/object/public/' + BUCKET_NAME + '/')[1];
    } else if (filePath.includes(BUCKET_NAME + '/')) {
      const parts = filePath.split(BUCKET_NAME + '/');
      filePath = parts[parts.length - 1];
    } else if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      // Non-supabase URL or external link, nothing to remove from storage
      return true;
    }
    // Strip query parameters
    filePath = filePath.split('?')[0];

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);
    if (error) {
      console.warn('Supabase storage delete note:', error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.warn('Supabase delete exception:', err?.message);
    return false;
  }
}

const JOBS_STORAGE_PATH = 'jobs/jobs_data.json';

/**
 * Fetches all jobs from Supabase (PostgreSQL table or Supabase Storage JSON)
 */
export async function fetchJobsFromSupabase(): Promise<any[]> {
  // 1. Try Supabase Table `jobs`
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data.map((d: any) => ({
        id: String(d.id),
        title: d.title || '',
        dept: d.dept || 'General',
        category: d.category || 'Sales',
        loc: d.loc || d.location || 'Durgapur, West Bengal',
        type: d.type || 'Full-time',
        exp: d.exp || d.experience || '1-3 years experience',
        salary: d.salary || '₹ 2.5 - 4 LPA (CTC)',
        desc: d.desc || d.description || '',
        requirements: Array.isArray(d.requirements) ? d.requirements : [],
        responsibilities: Array.isArray(d.responsibilities) ? d.responsibilities : [],
        createdAt: d.createdAt || d.created_at || new Date().toISOString(),
        updatedAt: d.updatedAt || d.updated_at || new Date().toISOString()
      }));
    }
  } catch (err) {
    console.warn('Supabase jobs table query note:', err);
  }

  // 2. Fallback: Supabase Storage JSON in bucket
  try {
    const { data: fileBlob, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(JOBS_STORAGE_PATH);

    if (!error && fileBlob) {
      const text = await fileBlob.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (storageErr) {
    console.warn('Supabase jobs storage query note:', storageErr);
  }

  return [];
}

/**
 * Persists all jobs to Supabase Storage JSON and PostgreSQL table
 */
export async function syncJobsToSupabase(allJobs: any[]): Promise<boolean> {
  let success = false;

  // 1. Save to Supabase Storage Bucket `media` under `jobs/jobs_data.json`
  try {
    const jsonBlob = new Blob([JSON.stringify(allJobs, null, 2)], {
      type: 'application/json'
    });
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(JOBS_STORAGE_PATH, jsonBlob, {
        upsert: true,
        contentType: 'application/json',
        cacheControl: '0'
      });

    if (!uploadErr) {
      success = true;
    } else {
      console.warn('Supabase jobs storage upload note:', uploadErr.message);
    }
  } catch (err) {
    console.warn('Supabase jobs storage sync note:', err);
  }

  // 2. Try saving to Supabase `jobs` table if available
  try {
    for (const job of allJobs) {
      await supabase.from('jobs').upsert({
        id: String(job.id),
        title: job.title || '',
        dept: job.dept || 'General',
        category: job.category || 'Sales',
        loc: job.loc || 'Durgapur, West Bengal',
        type: job.type || 'Full-time',
        exp: job.exp || '1-3 years experience',
        salary: job.salary || '₹ 2.5 - 4 LPA (CTC)',
        desc: job.desc || '',
        created_at: job.createdAt || new Date().toISOString(),
        updated_at: job.updatedAt || new Date().toISOString()
      }, { onConflict: 'id' });
    }
  } catch {}

  return success;
}

/**
 * Deletes a job from Supabase
 */
export async function removeJobFromSupabase(id: string, remainingJobs: any[]): Promise<boolean> {
  try {
    await supabase.from('jobs').delete().eq('id', id);
  } catch {}

  return syncJobsToSupabase(remainingJobs);
}

const MEDIA_CATALOG_PATH = 'catalog/media_catalog.json';

/**
 * Fetches media catalog from Supabase (Storage catalog JSON and/or PostgreSQL table)
 */
export async function fetchMediaFromSupabase(): Promise<any[]> {
  // 1. Try Supabase Storage catalog JSON
  try {
    const { data: fileBlob, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(MEDIA_CATALOG_PATH);

    if (!error && fileBlob) {
      const text = await fileBlob.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Supabase media catalog download note:', err);
  }

  // 2. Try Supabase Table `media`
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data.map((d: any) => ({
        id: String(d.id),
        type: d.type || 'photo',
        title: d.title || 'Media Asset',
        url: d.url || '',
        thumb: d.thumb || undefined,
        desc: d.desc || d.description || undefined,
        sector: d.sector || 'fmcg',
        productSub: d.product_sub || d.productSub || 'all_sub',
        productLabel: d.product_label || d.productLabel || undefined,
        tags: Array.isArray(d.tags) ? d.tags : (typeof d.tags === 'string' ? d.tags.split(',') : []),
        date: d.date || d.created_at || new Date().toISOString()
      }));
    }
  } catch {}

  return [];
}

/**
 * Persists all media items to Supabase Storage JSON and PostgreSQL table
 */
export async function syncMediaToSupabase(allMedia: any[]): Promise<boolean> {
  let success = false;
  try {
    const jsonBlob = new Blob([JSON.stringify(allMedia, null, 2)], {
      type: 'application/json'
    });
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(MEDIA_CATALOG_PATH, jsonBlob, {
        upsert: true,
        contentType: 'application/json',
        cacheControl: '0'
      });
    if (!error) {
      success = true;
    }
  } catch (err) {
    console.warn('Supabase media catalog upload note:', err);
  }

  // Also attempt table upsert if table exists
  try {
    for (const item of allMedia) {
      await supabase.from('media').upsert({
        id: String(item.id),
        type: item.type || 'photo',
        title: item.title || '',
        url: item.url || '',
        thumb: item.thumb || null,
        desc: item.desc || null,
        sector: item.sector || 'fmcg',
        product_sub: item.productSub || 'all_sub',
        product_label: item.productLabel || null,
        tags: item.tags || [],
        created_at: item.date || new Date().toISOString()
      }, { onConflict: 'id' });
    }
  } catch {}

  return success;
}

/**
 * Deletes a media item from Supabase (storage file, catalog JSON, and table)
 */
export async function removeMediaFromSupabase(id: string | number, url?: string, remainingMedia?: any[]): Promise<boolean> {
  if (url) {
    await deleteFromSupabase(url).catch(() => {});
  }
  try {
    await supabase.from('media').delete().eq('id', String(id));
  } catch {}

  if (Array.isArray(remainingMedia)) {
    return syncMediaToSupabase(remainingMedia);
  }
  return true;
}

