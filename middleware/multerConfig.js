import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Manually construct the upload directory path
const uploadDirectory = 'C:\\Users\\HP\\Desktop\\dreamer_summative_project\\uploads'; // Hardcoded for testing

// Debugging output
console.log('Upload Directory:', uploadDirectory);

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  console.log('Creating upload directory...'); // Debugging line
  fs.mkdirSync(uploadDirectory, { recursive: true });
} else {
  console.log('Upload directory already exists.'); // Debugging line
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });