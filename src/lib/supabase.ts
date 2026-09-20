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

