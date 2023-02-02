const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const user_stampService = require('./user_stamp.service');
const stampState = require('_helpers/state');
// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    user_stampService.getAll()
        .then(users_stamps => res.json(users_stamps))
        .catch(next);
}

function getById(req, res, next) {
    user_stampService.getById(req.params.id)
        .then(user_stamp => res.json(user_stamp))
        .catch(next);
}

function create(req, res, next) {
    user_stampService.create(req.body)
        .then(() => res.json({ message: 'User_Stamp created' }))
        .catch(next);
}

function update(req, res, next) {
    user_stampService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User_Stamp updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    user_stampService.delete(req.params.id)
        .then(() => res.json({ message: 'User_Stamp deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        stampModelid: Joi.string().required(),
        userid: Joi.string().required(),
        state: Joi.string().valid(stampState.Glued,stampState.NotGlued).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        stampModelid: Joi.string().required(),
        userid: Joi.string().required(),
        state: Joi.string().valid(stampState.Glued,stampState.NotGlued).required()
    });
    validateRequest(req, next, schema);
}
