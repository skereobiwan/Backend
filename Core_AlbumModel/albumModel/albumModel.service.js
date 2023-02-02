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
    return await db.AlbumModel.findAll();
}

async function getById(id) {
    return await getAlbumModel(id);
}

async function create(params) {
    // validate
    if (await db.AlbumModel.findOne({ where: { AlbumModelid: params.AlbumModelid } })) {
        throw 'Album Model "' + params.AlbumModelid + '" is already registered';
    }

    const AlbumModel = new db.AlbumModel(params);
   
    // save AlbumModel
    await AlbumModel.save();
}

async function update(id, params) {
    const AlbumModel = await getAlbumModel(id);

    // validate
    const AlbumModelChanged = params.id && AlbumModel.AlbumModelid !== params.id;
    if (AlbumModelChanged && await db.AlbumModel.findOne({ where: { AlbumModelid: params.id } })) {
        throw 'Album Model "' + params.id + '" is already registered';
    }

    // copy params to Album Model and save
    Object.assign(AlbumModel, params);
    await AlbumModel.save();
}

async function _delete(id) {
    const AlbumModel = await getAlbumModel(id);
    await AlbumModel.destroy();
}

// helper functions

async function getAlbumModel(id) {
    const AlbumModel = await db.AlbumModel.findByPk(id);
    if (!AlbumModel) throw 'Album Model not found';
    return AlbumModel;
}
