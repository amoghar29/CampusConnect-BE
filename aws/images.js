const dotenv = require("dotenv");
dotenv.config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
async function uploadToS3(file, clubName) {
  if (!file) {
    throw new Error("No file uploaded");
  }
  const extension = file.originalname.split(".").pop(); // Extract file extension
  const imageName = `${Date.now()}.${extension}`; // Unique image name

  // Resize the image to 360x360 pixels
  const resizedImageBuffer = await sharp(file.buffer)
    .resize(360, 360, {
      fit: sharp.fit.cover, // Ensures the image covers the 360x360 area
      position: sharp.position.center, // Center the image
    })
    .toBuffer();

  // console.log("Resized image buffer length:", resizedImageBuffer.length);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME, // S3 Bucket name
    Key: `${process.env.AWS_KEY}/${clubName}/events/${imageName}`, // Organized path
    Body: resizedImageBuffer, // Use the resized image buffer
    ContentType: `image/${extension}`, // Set the content type based on the file extension
  };

  try {
    const res = await s3.send(new PutObjectCommand(uploadParams));
    console.log("res", res);

    // Return the full S3 Key or URL for further use
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;
  } catch (error) {
    // console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload image to S3");
  }
}

module.exports = { uploadToS3 };
