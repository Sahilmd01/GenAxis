import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      throw new Error(
        "Cloudinary setup is incomplete. Please make sure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set in your environment."
      );
    }

    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });


    const response = await cloudinary.api.ping();
    console.log("✅ Connected to Cloudinary successfully!");

    return response;
  } catch (error) {
    console.error("⚠️ Could not connect to Cloudinary.");
    console.error("Reason:", error.message);
    throw new Error("Cloudinary connection failed. Please check your credentials or internet connection.");
  }
};

export default connectCloudinary;
