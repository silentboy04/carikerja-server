const express = require('express');
const router = express.Router();

const {
    upload
} = require('../middlewares/upload');
const {
    getFiles,
    getFile,
    getImage,
    uploadFile,
    deleteFile
} = require('../controllers/upload');

router.get('/files', getFiles);

router.get('/files/:filename', getFile);

router.get('/image/:filename', getImage);

router.post('/', upload.single('file'), uploadFile);

router.delete('/files/:filename', deleteFile);

module.exports = router;