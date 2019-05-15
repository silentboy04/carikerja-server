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

exports.getFiles = (req, res, next) => {
    gfs.files.find().sort({
        uploadDate: -1
    }).toArray((err, files) => {
        if (files) {
            return res.status(200).json(files);
        }
    });
};

exports.getFile = (req, res, next) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        if (!file) {
            return res.status(404).json({
                message: req.t('fileNotFound')
            });
        }
        return res.status(200).json(file);
    });
};

exports.getImage = (req, res, next) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        if (!file) {
            return res.status(404).json({
                message: req.t('fileNotFound')
            });
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png') {
            const readStream = gfs.createReadStream(file.filename);
            return readStream.pipe(res);
        } else {
            return res.status(404).json({
                message: req.t('notImage')
            });
        }
    })
};

exports.uploadFile = (req, res, next) => {
    return res.status(201).json(req.file);
};

exports.deleteFile = async (req, res, next) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        if (!file) {
            return res.status(404).json({
                message: req.t('fileNotFound')
            });
        }
        return gfs.remove({
            filename: req.params.filename,
            root: 'uploads'
        }, (err, result) => {
            return res.status(201).json({
                message: req.t('fileDeleted')
            });
        });
    });
};