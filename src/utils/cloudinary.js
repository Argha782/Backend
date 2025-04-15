import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Delete local file after successful upload
    // try {
    //   if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
    //     console.log(`Deleted local file: ${localFilePath}`);
    //   }
    // } catch (error) {
    //   console.error(`Error deleting local file: ${error.message}`);
    // }

    return response;
  } catch (error) {
    // Delete local file if upload fails
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        console.log(`Deleted local file after failed upload: ${localFilePath}`);
      } catch (deleteError) {
        console.error(`Error deleting local file: ${deleteError.message}`);
      }
    }
    return null;
  }
};

export { uploadOnCloudinary };
