const express = require('express');
const ImageRouter = express.Router();

const ImageModel = require('../models/image.model');

//CRUD

ImageRouter.post('/', (req, res) => {
    const { imageUrl, owner, description, title } = req.body || {};

    ImageModel.create(
        { imageUrl, owner, description, title },
        (err, imageCreated) => {
            if(err) res.status(500).json({ success: 0, error: err })
            else res.status(201).json({ success: 1, image: imageCreated });
        });
});

ImageRouter.get('/', (req, res) => {
    ImageModel.find({})
        .populate('owner', 'username name')
        .exec((err, images) => {
            if(err) res.status(500).json({ success: 0, error: err })
            else res.json({ success: 1, images: images });
        });
});

// BTVN update + delete + get image by id

// ImageRouter.get('/:id', ...) -> get image by id

module.exports = ImageRouter;