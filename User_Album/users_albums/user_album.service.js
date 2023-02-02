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
    return await db.User_album.findAll();
}

async function getById(id) {
    return await getUser_album(id);
}

async function create(params) {
    // validate
    if (await db.User_album.findOne({ where: { albumid: params.albumid } })) {
        throw 'Album "' + params.albumid + '" is already registered';
    }
 
    const user_album = new db.User_album(params);
    
    // save user_album
    await user_album.save();
}

async function update(id, params) {
    const user_album = await getUser_album(id);

    // validate
    const user_albumChanged = params.albumid && user_album.albumid !== params.albumid;
    if (user_albumChanged && await db.User_album.findOne({ where: { albumid: params.albumid } })) {
        throw 'Album "' + params.albumid + '" is already registered';
    }

   // copy params to user_album and save
    Object.assign(user_album, params);
    await user_album.save();
}

async function _delete(id) {
    const user_album = await getUser_album(id);
    await user_album.destroy();
}

// helper functions

async function getUser_album(id) {
    const user_album = await db.User_album.findByPk(id);
    if (!user_album) throw 'Album not found';
    return user_album;
}
