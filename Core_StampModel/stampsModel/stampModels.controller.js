const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const State = require('_helpers/state');
const Currency = require('_helpers/currency');
const stampModelService = require('./stampModel.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    stampModelService.getAll()
        .then(stamps => res.json(stamps))
        .catch(next);
}

function getById(req, res, next) {
    stampModelService.getById(req.params.id)
        .then(stamp => res.json(stamp))
        .catch(next);
}

function create(req, res, next) {
    stampModelService.create(req.body)
        .then(() => res.json({ message: 'Stamp Model created' }))
        .catch(next);
}

function update(req, res, next) {
    stampModelService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Stamp Model updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    stampModelService.delete(req.params.id)
        .then(() => res.json({ message: 'Stamp Model deleted' }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        serieid: Joi.string().required(),
        quantity: Joi.number().required(),
        quantityRemainder:Joi.number().required(),
        description: Joi.string().required(),
        linkDesign: Joi.string().required(),
        unitCost: Joi.number().required(),
        currency: Joi.string().valid(Currency.Peso).required(),
        index: Joi.string().email().required(),
        state: Joi.string().valid(State.Valid,State.Expired,State.OutOfStock).required(),
        changeStateDate: Joi.date().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        serieid: Joi.string().required(),
        quantity: Joi.number().required(),
        quantityRemainder:Joi.number().required(),
        description: Joi.string().required(),
        linkDesign: Joi.string().required(),
        unitCost: Joi.number().required(),
        currency: Joi.string().valid(Currency.Peso).required(),
        index: Joi.string().email().required(),
        state: Joi.string().valid(State.Valid,State.Expired,State.OutOfStock).required(),
        changeStateDate: Joi.date().required()
    });
    validateRequest(req, next, schema);
}
