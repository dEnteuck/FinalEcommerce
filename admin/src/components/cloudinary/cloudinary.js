import axios from 'axios';

import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dnolefiaq', 
//   api_key: '673869314237682', 
//   api_secret: 'SvyHzi_HdOtGUhRhFHw6f2EkXUU' 
// });

export const uploadCloudinary=async(file, formData)=>{
    formData.append("images",file);
    formData.append("upload_preset","dvyozjjma");
    const {data} = await axios.post("https://api.cloudinary.com/v1_1/dvyozjjma/image/upload", formData);

    return {publicId: data?.public_id, url: data?.secure_url, formData}
}