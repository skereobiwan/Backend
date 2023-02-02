const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const serieService = require('./series.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    serieService.getAll()
        .then(serie => res.json(series))
        .catch(next);
}

function getById(req, res, next) {
    serieService.getById(req.params.id)
        .then(serie => res.json(serie))
        .catch(next);
}

function create(req, res, next) {
    serieService.create(req.body)
        .then(() => res.json({ message: 'Serie created' }))
        .catch(next);
}

function update(req, res, next) {
    serieService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Serie updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    serieService.delete(req.params.id)
        .then(() => res.json({ message: 'Serie deleted' }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number.required(),
        startdate: Joi.date().required(),
        finishdate: Joi.date().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number.required(),
        startdate: Joi.date().required(),
        finishdate: Joi.date().required()
    });
    validateRequest(req, next, schema);
}
