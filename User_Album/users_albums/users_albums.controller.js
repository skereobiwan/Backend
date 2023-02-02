const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const user_AlbumService = require('./user_album.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    user_AlbumService.getAll()
        .then(users_albums => res.json(users_albums))
        .catch(next);
}

function getById(req, res, next) {
    user_AlbumService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    user_AlbumService.create(req.body)
        .then(() => res.json({ message: 'User_Album created' }))
        .catch(next);
}

function update(req, res, next) {
    user_AlbumService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User_Album updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    user_AlbumService.delete(req.params.id)
        .then(() => res.json({ message: 'User_Album deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        albumModelid: Joi.string().required(),
        userid: Joi.string().required(),
        title: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        albumModelid: Joi.string().required(),
        userid: Joi.string().required(),
        title: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
