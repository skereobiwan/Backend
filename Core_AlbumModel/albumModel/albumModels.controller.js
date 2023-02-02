const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const albumModelService = require('./albumModel.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    albumModelService.getAll()
        .then(albumModels => res.json(albumModels))
        .catch(next);
}

function getById(req, res, next) {
    albumModelService.getById(req.params.id)
        .then(albumModel => res.json(albumModel))
        .catch(next);
}

function create(req, res, next) {
    albumModelService.create(req.body)
        .then(() => res.json({ message: 'Album Model created' }))
        .catch(next);
}

function update(req, res, next) {
    albumModelService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Album Model updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    albumModelService.delete(req.params.id)
        .then(() => res.json({ message: 'Album Model deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        template: Joi.string()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        template: Joi.string()
    });
    validateRequest(req, next, schema);
}
