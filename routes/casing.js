const express = require('express');
const router = express.Router();

const {
    upload
} = require('../middlewares/upload');
const {
    createCasing,
    getCasing,
    getCasings,
} = require('../controllers/casing');

router.get('/', getCasings);

router.get('/:id', getCasing);

router.post('/', upload.single('casingimage'), createCasing);

module.exports = router;