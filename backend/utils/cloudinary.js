import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

//function to uplaod files on cloudinary 
const uploadOnCloudinary = async (file) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        //result stores the url of image location
        const result = await  cloudinary.uploader.upload(file)
        //this delete the file
        fs.unlinkSync(file)
        return result.secure_url

    } catch (error) {
         fs.unlinkSync(file)
         return res.status(500).json({message:"file upload error"})
    }
}

export default uploadOnCloudinary