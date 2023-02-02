const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const profileService = require('./profile.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    profileService.getAll()
        .then(profiles => res.json(profiles))
        .catch(next);
}

function getById(req, res, next) {
    profileService.getById(req.params.id)
        .then(profile => res.json(profile))
        .catch(next);
}

function create(req, res, next) {
    profileService.create(req.body)
        .then(() => res.json({ message: 'Profile created' }))
        .catch(next);
}

function update(req, res, next) {
    profileService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Profile updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    profileService.delete(req.params.id)
        .then(() => res.json({ message: 'Profile deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        userid: Joi.string().required(),
        title: Joi.string(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Padre,Role.Madre,Role.Tutor,Role.Ahorrista).required(),
        gender: Joi.string().required(),
        birthday: Joi.date().required(),
        avatar: Joi.string(),
        documentType: Joi.string().required(),
        documentNumber: Joi.string().required(),
        documentPictureFront: Joi.string(),
        documentPictureBack: Joi.string(),
        renaperValid: Joi.bool()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        userid: Joi.string().required(),
        title: Joi.string(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Padre,Role.Madre,Role.Tutor,Role.Ahorrista).required(),
        gender: Joi.string().required(),
        birthday: Joi.date().required(),
        avatar: Joi.string(),
        documentType: Joi.string().required(),
        documentNumber: Joi.string().required(),
        documentPictureFront: Joi.string(),
        documentPictureBack: Joi.string(),
        renaperValid: Joi.bool()
    });
    validateRequest(req, next, schema);
}
