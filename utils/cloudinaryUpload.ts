// utils/cloudinaryUpload.ts
interface UploadResult {
    secure_url: string;
    // Other Cloudinary response fields if needed
  }
  
  export const uploadToCloudinary = async (
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
  
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress?.(percent);
        }
      });
  
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      });
  
      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });
  
      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        true
      );
      xhr.send(formData);
    });
  };