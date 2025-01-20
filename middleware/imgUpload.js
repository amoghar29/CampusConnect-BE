const cloudinary = require("../cloudinary/cloudinartConfig");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Create storage configuration for each image type
const createStorage = (imageType) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: (req) => `images/${req.clubName}/${imageType}`,
      allowed_formats: ["jpg", "png", "jpeg"],
    },
  });
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

try {
  // Create storage instances for each type
  const logoStorage = createStorage("logo");
  const bannerStorage = createStorage("banner");
  const eventImageStorage = createStorage("eventImage");

  // Create individual upload instances
  const logoUpload = multer({
    storage: logoStorage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
  });

  const bannerUpload = multer({
    storage: bannerStorage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
  });

  const eventImageUpload = multer({
    storage: eventImageStorage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
  });

  // Middleware for handling multiple image uploads
  const handleMultipleUploads = () => {
    const upload = multer({
      storage: multer.memoryStorage(),
      fileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }
    }).fields([
      { name: 'banner', maxCount: 1 },
      { name: 'eventImage', maxCount: 1 }
    ]);

    return (req, res, next) => {
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({
            message: "File upload error",
            error: err.message
          });
        } else if (err) {
          return res.status(500).json({
            message: "Server error",
            error: err.message
          });
        }

        // If no files uploaded, continue
        if (!req.files) {
          return next();
        }

        try {
          const uploadToCloudinary = async (file, folder) => {
            if (!file) return null;
            
            return new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: `images/${req.clubName}/${folder}`
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result.secure_url);
                }
              );
              
              uploadStream.end(file.buffer);
            });
          };

          // Handle banner upload
          if (req.files.banner) {
            const bannerUrl = await uploadToCloudinary(req.files.banner[0], 'banner');
            if (bannerUrl) req.body.banner = bannerUrl;
          }

          // Handle event image upload
          if (req.files.eventImage) {
            const eventImageUrl = await uploadToCloudinary(req.files.eventImage[0], 'eventImage');
            if (eventImageUrl) req.body.eventImage = eventImageUrl;
          }

          next();
        } catch (error) {
          return res.status(500).json({
            message: "Error uploading to cloud storage",
            error: error.message
          });
        }
      });
    };
  };

  module.exports = {
    uploadLogo: (fieldName) => logoUpload.single(fieldName),
    uploadBanner: (fieldName) => bannerUpload.single(fieldName),
    uploadEventImage: (fieldName) => eventImageUpload.single(fieldName),
    uploadMultiple: handleMultipleUploads
  };
} catch (error) {
  const errorHandler = (req, res) => {
    res.status(500).json({
      message: "Image upload service is not configured",
      error: error.message
    });
  };

  module.exports = {
    uploadLogo: () => errorHandler,
    uploadBanner: () => errorHandler,
    uploadEventImage: () => errorHandler,
    uploadMultiple: () => errorHandler
  };
}