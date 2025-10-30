import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedDocTypes = ['application/pdf'];
  
  if (file.fieldname === 'image' && allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === 'resume' && allowedDocTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: ${file.fieldname === 'image' ? 'JPEG, PNG, WebP' : 'PDF'}`), false);
  }
};

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Specific upload configurations
export const imageUpload = upload.single('image');
export const resumeUpload = upload.single('resume');