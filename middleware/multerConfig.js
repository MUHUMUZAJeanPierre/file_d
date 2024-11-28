import multer from "multer";
import path from "path";

// Manually construct the __dirname equivalent in ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Correctly resolve the upload directory path
const uploadDirectory = path.join(__dirname, "../user_files");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
