/**
 * Utility to compress and optimize uploaded images for web delivery and database persistence.
 * Resizes large camera/phone photos to max dimensions and converts to efficient JPEG/WebP.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: string;
}

export interface CompressedImageResult {
  dataUrl: string;
  originalSizeMB: number;
  compressedSizeKB: number;
  width: number;
  height: number;
  fileName: string;
}

/**
 * Compresses an image File object into an optimized base64 data URL.
 */
export const compressImageFile = async (
  file: File,
  options: CompressionOptions = {}
): Promise<CompressedImageResult> => {
  const {
    maxWidth = 1280,
    maxHeight = 1280,
    quality = 0.82,
    mimeType = 'image/jpeg'
  } = options;

  const originalSizeMB = file.size / (1024 * 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaled dimensions maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original read if canvas context fails
          const dataUrl = event.target?.result as string;
          resolve({
            dataUrl,
            originalSizeMB,
            compressedSizeKB: Math.round(file.size / 1024),
            width: img.width,
            height: img.height,
            fileName: file.name
          });
          return;
        }

        // Fill background with white for transparent PNG conversion to JPEG
        if (mimeType === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        // Draw and smoothly scale
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized data URL
        const dataUrl = canvas.toDataURL(mimeType, quality);
        
        // Calculate compressed size in KB from base64 string
        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const compressedSizeKB = Math.round((base64Length * 3) / 4 / 1024);

        resolve({
          dataUrl,
          originalSizeMB,
          compressedSizeKB,
          width,
          height,
          fileName: file.name
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image into memory for compression'));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file from disk'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Creates a low-res thumbnail from a data URL or File
 */
export const createThumbnail = async (
  source: string | File,
  options: { maxWidth?: number; maxHeight?: number; quality?: number } = {}
): Promise<string> => {
  const { maxWidth = 320, maxHeight = 320, quality = 0.75 } = options;

  if (source instanceof File) {
    const res = await compressImageFile(source, { maxWidth, maxHeight, quality });
    return res.dataUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(source);
        return;
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', quality));
    };

    img.onerror = () => resolve(source);
    img.src = source;
  });
};
