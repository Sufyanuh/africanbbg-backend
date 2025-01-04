import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Define folder where the files will be uploaded
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Generate unique filename
  },
});

const uploadSingleFile = (key) =>
  multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }).single(key);
export default uploadSingleFile;
