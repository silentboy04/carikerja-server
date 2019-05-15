const mongoose = require('mongoose');
const moment = require('moment');

const Casing = require('../models/casing');

const environment = require('../env.json');

exports.getCasings = (req, res, next) => {
    Casing.find()
        .exec()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(error => {
            return res.status(500).json({
                message: 'cannot get Casing'
            });
        });
};

exports.getCasing = (req, res, next) => {
    const id = req.params.id;
    Casing.findById(id)
        .exec()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(error => {
            return res.status(500).json({
                message: 'cannot get Casing'
            });
        });
};

exports.createCasing = (req, res, next) => {
    const {
        name,
        description,
        price
    } = req.body;
    const casing = new Casing({
        name,
        description,
        price,
        casingimage: req.file.filename
    });
    casing.save()
        .then(result => {
            return res.status(201).json({
                message: 'Casing created'
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Failed to create Casing'
            });
        });
};