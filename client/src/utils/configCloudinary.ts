import axios from 'axios';


export async function uploadImageToCloudinary(file: File | Blob) {
  try {
    const preset =  import.meta.env.VITE_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;
   /*  const cloudinaryConfig = cloudinary.config({
      cloud_name: import.meta.env.VITE_CLOUD_NAME, 
      api_key: import.meta.env.VITE_CLOUD_API_KEY, 
      api_secret: import.meta.env.VITE_CLOUD_API_SECRECT
    }); */

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

    const formData = new FormData();
    formData.append('upload_preset', `${preset}`)
    formData.append('file', file);
    const res = await axios.post(cloudinaryUrl, formData);
    if (!(res.status === 200)) return null;
    return res.data.secure_url;

  } catch (error) {
    console.error("Error al cargar la imagen en Cloudinary:", error);
    throw error;
  }
}
