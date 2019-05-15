const express = require('express');
const expressGraphql = require('express-graphql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const i18n = require('i18next');
const i18nMiddleware = require('i18next-express-middleware');

// TAMBAH
const psu = require('./routes/psu');
const casing = require('./routes/casing');
const ssd = require('./routes/ssd');
const mouse = require('./routes/mouse');
const mobo = require('./routes/mobo');
const monitor = require('./routes/monitor');
const ram = require('./routes/ram');
const keyboard = require('./routes/keyboard');
const hdd = require('./routes/hdd');
const fan = require('./routes/fan');
const cooler = require('./routes/cooler');
const proc = require('./routes/proc');
const vga = require('./routes/vga');
const upload = require('./routes/upload');

const environment = require('./env.json');

const app = express();

i18n.use(i18nMiddleware.LanguageDetector)
    .init({
        preload: ['en', 'id'],
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: {
                    allMajor: 'All Major',
                    informatic: 'Informatic',
                    electro: 'Electro',
                    engine: 'Engine',
                    management: 'Management Business',
                    getAnnouncementsError: 'Something error while getting announcements',
                    getAnnouncementNotFound: 'Announcement not found',
                    getAnnouncementError: 'Something error while getting announcement',
                    announcementCreated: 'Announcement created',
                    announcementCreateError: 'Something error while createing announcement',
                    announcementUpdated: 'Announcement updated',
                    announcementUpdateError: 'Something error while updating announcement',
                    announcementDeleted: 'Announcement deleted',
                    announcementDeleteError: 'Something error while deleting announcement',
                    getEventsError: 'Something error while getting events',
                    getEventNotFound: 'Event not found',
                    getEventError: 'Something error while getting event',
                    eventCreated: 'Event created',
                    eventCreateError: 'Something error while createing event',
                    eventUpdated: 'Event updated',
                    eventUpdateError: 'Something error while updating event',
                    eventDeleted: 'Event deleted',
                    eventDeleteError: 'Something error while deleting event',
                    fileNotFound: 'File not found',
                    notImage: 'Not an image',
                    fileDeleted: 'File deleted',
                    userNameTaken: 'Username already taken',
                    hashingError: 'Something error while hashing your password',
                    accountCreated: 'Account created',
                    accountCreateError: 'Something error while creating your account',
                    usernameNotRegistered: 'Username not registered',
                    comparingPasswordError: 'Something error while comparing your password',
                    loginSuccess: 'Login success',
                    wrongPassword: 'Wrong Password',
                    auth: 'You are not authorized, login first'
                    
                }
            },
            id: {
                translation: {
                    allMajor: 'Semua Jurusan',
                    informatic: 'Teknik Informatika',
                    electro: 'Teknik Elektronika',
                    engine: 'Teknik Mesin',
                    management: 'Manajemen Bisnis',
                    getAnnouncementsError:'Something error while getting announcements',
                    getAnnouncementNotFound: 'Pengumuman tidak ditemukan',
                    getAnnouncementError: 'Something error while getting announcement',
                    announcementCreated: 'Pengumuman dibuat',
                    announcementCreateError: 'Something error while createing announcement',
                    announcementUpdated: 'Pengumuman diubah',
                    announcementUpdateError: 'Something error while updating announcement',
                    announcementDeleted: 'Pengumuman terhapus',
                    announcementDeleteError: 'Something error while deleting announcement',
                    getEventsError:'Something error while getting events',
                    getEventNotFound: 'Acara tidak ditemukan',
                    getEventError: 'Something error while getting event',
                    eventCreated: 'Acara dibuat',
                    eventCreateError: 'Something error while createing event',
                    eventUpdated: 'Acara diubah',
                    eventUpdateError: 'Something error while updating event',
                    eventDeleted: 'Acara terhapus',
                    eventDeleteError: 'Something error while deleting event',
                    fileNotFound: 'Berkas tidak ditemukan',
                    notImage: 'Bukan sebuah gambar',
                    fileDeleted: 'Berkas terhapus',
                    userNameTaken: 'Username telah dipakah',
                    hashingError: 'Something error while hashing your password',
                    accountCreated: 'Akun telah dibuat',
                    accountCreateError: 'Something error while creating your account',
                    usernameNotRegistered: 'Username tidak terdaftar',
                    comparingPasswordError: 'Something error while comparing your password',
                    loginSuccess: 'Login berhasil',
                    wrongPassword: 'Password salah',
                    auth: 'You are not authorized, login first'
                    
                }
            }
        },
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.use(i18nMiddleware.handle(i18n, {
    removeLngFromUrl: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

// TAMBAH
app.use('/api/vga', vga);
app.use('/api/proc', proc);
app.use('/api/casing', casing);
app.use('/api/ssd', ssd);
app.use('/api/mouse', mouse);
app.use('/api/mobo', mobo);
app.use('/api/monitor', monitor);
app.use('/api/ram', ram);
app.use('/api/keyboard', keyboard);
app.use('/api/hdd', hdd);
app.use('/api/fan', fan);
app.use('/api/cooler', cooler);
app.use('/api/psu', psu);
app.use('/api/upload', upload);

app.use((req, res, next) => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
});

mongoose.connect(environment.env.MONGODB_URI, {
    useNewUrlParser: true
}, (error, result) => {
    if (error) {
        return console.log(error);
    }
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000);
});
mongoose.Promise = global.Promise;