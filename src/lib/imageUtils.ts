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
  let {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.8,
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

        const maxAllowedBase64Length = 650000; // ~480KB, strictly under Firestore's 1MB limit

        const renderCanvas = (targetW: number, targetH: number, q: number): string => {
          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          if (!ctx) return '';
          if (mimeType === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, targetW, targetH);
          }
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetW, targetH);
          return canvas.toDataURL(mimeType, q);
        };

        // Initial scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        let dataUrl = renderCanvas(width, height, quality);

        // Iterative reduction loop if image dataUrl is still larger than limit
        let currentQ = quality;
        let currentW = width;
        let currentH = height;

        while (dataUrl.length > maxAllowedBase64Length && currentQ > 0.35) {
          currentQ -= 0.12;
          if (currentW > 700) {
            currentW = Math.round(currentW * 0.85);
            currentH = Math.round(currentH * 0.85);
          }
          dataUrl = renderCanvas(currentW, currentH, currentQ);
        }

        if (dataUrl.length > maxAllowedBase64Length && currentW > 400) {
          currentW = Math.round(currentW * 0.7);
          currentH = Math.round(currentH * 0.7);
          dataUrl = renderCanvas(currentW, currentH, 0.45);
        }

        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const compressedSizeKB = Math.round((base64Length * 3) / 4 / 1024);

        resolve({
          dataUrl,
          originalSizeMB,
          compressedSizeKB,
          width: currentW,
          height: currentH,
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
