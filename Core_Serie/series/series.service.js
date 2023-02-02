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
    return await db.Serie.findAll();
}

async function getById(id) {
    return await getSerie(id);
}

async function create(params) {
    // validate
    if (await db.Serie.findOne({ where: { serieid: params.serieid } })) {
        throw 'Serie "' + params.serieid + '" is already registered';
    }

    const serie = new db.Serie(params);
    
    // save serie
    await serie.save();
}

async function update(id, params) {
    const serie = await getSerie(id);

    // validate
    const serieChanged = params.serieid && serie.serieid !== params.serieid;
    if (serieChanged && await db.Serie.findOne({ where: { serieid: params.serieid } })) {
        throw 'Serie "' + params.serieid + '" is already registered';
    }

    // copy params to stamp and save
    Object.assign(serie, params);
    await serie.save();
}

async function _delete(id) {
    const serie = await getSerie(id);
    await serie.destroy();
}

// helper functions

async function getSerie(id) {
    const serie = await db.Serie.findByPk(id);
    if (!serie) throw 'Serie not found';
    return serie;
}
