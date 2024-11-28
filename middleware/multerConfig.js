import path from "path";
import multer from "multer";

const uploadDirectory = path.join(path.dirname(new URL(import.meta.url).pathname), "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
