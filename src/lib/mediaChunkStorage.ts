import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { idbGet, idbSet, idbDelete } from './idbStorage';

// 250KB chunk size ensures each chunk document remains well below Firestore's 1MB single-document limit and request size limits
const CHUNK_SIZE = 250 * 1024;

export const isLargePayload = (str?: string | null): boolean => {
  return typeof str === 'string' && str.length > 250 * 1024;
};

/**
 * Splits a base64 / data URL payload into Firestore chunk documents inside `media/{docId}/chunks`
 * and caches it in local IndexedDB for instant zero-lag playback.
 */
export const saveMediaChunks = async (
  docId: string,
  fullDataUrl: string,
  onProgress?: (percent: number) => void
): Promise<number> => {
  if (!fullDataUrl || !docId) return 0;

  // 1. Immediately cache in IndexedDB for immediate local playback
  try {
    await idbSet(`media_chunk_cache_${docId}`, fullDataUrl);
  } catch (err) {
    console.warn('IDB chunk cache note:', err);
  }

  // 2. Break payload into chunks
  const chunks: string[] = [];
  for (let i = 0; i < fullDataUrl.length; i += CHUNK_SIZE) {
    chunks.push(fullDataUrl.slice(i, i + CHUNK_SIZE));
  }

  const totalChunks = chunks.length;

  // 3. Write chunks individually to Firestore subcollection
  for (let i = 0; i < chunks.length; i++) {
    const chunkRef = doc(db, 'media', docId, 'chunks', `chunk_${String(i).padStart(4, '0')}`);
    try {
      await setDoc(chunkRef, {
        index: i,
        data: chunks[i],
        count: totalChunks,
        updatedAt: new Date().toISOString()
      });
    } catch (err: any) {
      console.warn(`Firestore chunk write warning on chunk ${i}:`, err?.message);
    }

    if (onProgress) {
      onProgress(Math.round(((i + 1) / totalChunks) * 100));
    }
  }

  return totalChunks;
};

/**
 * Reassembles chunked media from IndexedDB cache or Firestore subcollection
 */
export const loadMediaChunks = async (docId: string): Promise<string | null> => {
  if (!docId) return null;

  // 1. Check local IndexedDB cache first
  try {
    const cached = await idbGet<string>(`media_chunk_cache_${docId}`);
    if (cached && typeof cached === 'string' && cached.length > 0) {
      return cached;
    }
  } catch (err) {
    console.warn('IDB get chunk cache note:', err);
  }

  // 2. Fetch all chunk documents from Firestore
  try {
    const chunksRef = collection(db, 'media', docId, 'chunks');
    const snapshot = await getDocs(chunksRef);
    if (snapshot.empty) return null;

    const rawChunks: { index: number; data: string }[] = [];
    snapshot.forEach(d => {
      const data = d.data();
      if (typeof data.data === 'string') {
        rawChunks.push({
          index: typeof data.index === 'number' ? data.index : 0,
          data: data.data
        });
      }
    });

    rawChunks.sort((a, b) => a.index - b.index);
    const reassembled = rawChunks.map(c => c.data).join('');

    if (reassembled) {
      idbSet(`media_chunk_cache_${docId}`, reassembled).catch(() => {});
      return reassembled;
    }
  } catch (err) {
    console.warn(`Failed to load chunks for doc ${docId}:`, err);
  }

  return null;
};

/**
 * Cleans up chunks from Firestore and local cache when a media item is deleted
 */
export const deleteMediaChunks = async (docId: string): Promise<void> => {
  if (!docId) return;

  // 1. Remove from local IDB
  try {
    await idbDelete(`media_chunk_cache_${docId}`);
  } catch (err) {
    console.warn('IDB delete chunk cache note:', err);
  }

  // 2. Delete chunk documents from Firestore subcollection
  try {
    const chunksRef = collection(db, 'media', docId, 'chunks');
    const snapshot = await getDocs(chunksRef);
    if (!snapshot.empty) {
      await Promise.all(snapshot.docs.map(d => deleteDoc(d.ref).catch(() => {})));
    }
  } catch (err) {
    console.warn(`Failed to delete chunks for doc ${docId}:`, err);
  }
};
