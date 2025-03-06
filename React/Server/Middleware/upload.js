import fs from 'fs';
import multer from 'multer';
import path from 'path';

// Ensure 'uploads' directory exists
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage strategy
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save to 'uploads' directory
    },
    filename: function (req, file, cb) {
        // Remove spaces from filename to prevent errors
        const sanitizedFilename = file.originalname.replace(/\s+/g, '-'); 
        cb(null, `${Date.now()}-${sanitizedFilename}`);
    }
});

// Multer upload middleware
const upload = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

export default upload;
