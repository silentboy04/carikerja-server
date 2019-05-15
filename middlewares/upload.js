const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const environment = require('../env.json');

const mongoURI = environment.env.MONGODB_URI;
const connection = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true
});

let gfs;

connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

const storage = new GridFsStorage({
    url: mongoURI,
    options: {
        useNewUrlParser: true
    },
    file: (req, file) => {
        return new Promise((resolve,reject) => {
            crypto.randomBytes(16, (err,buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

module.exports = {
    upload
}