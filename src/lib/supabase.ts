import { createClient } from '@supabase/supabase-js';
import { generateSecureHashedFileName, validateFileMagicBytes } from './security';

export const SUPABASE_URL = 
  (import.meta as any).env?.VITE_SUPABASE_URL || 'https://wgfzigyajmbeggbiukqh.supabase.co';
export const SUPABASE_ANON_KEY = 
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_dJs1lIjpIEj9DqGMdGB-fQ_vCP_0DPy';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const BUCKET_NAME = 'media';

/**
 * Uploads a file (photo, video, audio, certificate, resume) securely to Supabase Storage
 * with magic-byte binary header validation and clean randomized cryptographic name hashing.
 */
export async function uploadToSupabase(
  file: File | Blob, 
  folder: 'photos' | 'videos' | 'audios' | 'certificates' | 'resumes' | 'general' = 'general',
  originalFileName?: string,
  skipSignatureCheck = false
): Promise<{ url: string; secureFileName?: string; error?: string }> {
  try {
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

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type || undefined
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
