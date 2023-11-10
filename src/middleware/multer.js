/* eslint-disable no-undef */
const multer = require('multer');
const { diskStorage } = require('multer');
const { extname } = require('path');

module.exports = multer({
    storage: diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error('File type is not supported'), false);
            return;
        }
        cb(null, true);
    },
});
