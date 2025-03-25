import multer from "multer";

const memory = multer.memoryStorage();

export const uploadMiddlewareMemory = multer({ storage: memory });

