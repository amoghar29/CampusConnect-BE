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
  const extension = file.originalname.split(".").pop(); 
  const imageName = `${Date.now()}.${extension}`; 

  // Resize the image to 360x360 pixels
  const resizedImageBuffer = await sharp(file.buffer)
    .resize(360, 360, {
      fit: sharp.fit.cover, // Ensures the image covers the 360x360 area
      position: sharp.position.center, // Center the image
    })
    .toBuffer();


  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${process.env.AWS_KEY}/${clubName}/events/${imageName}`, 
    Body: resizedImageBuffer, 
    ContentType: `image/${extension}`, 
  };

  try {
    const res = await s3.send(new PutObjectCommand(uploadParams));

    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;
  } catch (error) {
    throw new Error("Failed to upload image to S3");
  }
}

module.exports = { uploadToS3 };
