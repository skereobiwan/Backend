const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.StampModel.findAll();
}

async function getById(id) {
    return await getStampModel(id);
}

async function create(params) {
    // validate
    if (await db.StampModel.findOne({ where: { stampModelid: params.stampModelid } })) {
        throw 'Stamp Model "' + params.stampModelid + '" is already registered';
    }

    const stampModel = new db.StampModel(params);
    
    // fecha de actualización de la estampilla
    // stamp.passwordHash = await bcrypt.hash(params.password, 10);

    // save stamp
    await stampModel.save();
}

async function update(id, params) {
    const stampModel = await getStampModel(id);

    // validate
    const stampModelChanged = params.stampModelid && stamp.stampModelid !== params.stampModelid;
    if (stampModelChanged && await db.StampModel.findOne({ where: { stampModelid: params.stampModelid } })) {
        throw 'Stamp Model "' + params.stampModelid + '" is already registered';
    }

    // hash password if it was entered
    /*
     if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }
    */

    // copy params to stamp and save
    Object.assign(stampModel, params);
    await stampModel.save();
}

async function _delete(id) {
    const stampModel = await getStampModel(id);
    await stampModel.destroy();
}

// helper functions

async function getStamp(id) {
    const stampModel = await db.StampModel.findByPk(id);
    if (!stampModel) throw 'Stamp Model not found';
    return stampModel;
}
