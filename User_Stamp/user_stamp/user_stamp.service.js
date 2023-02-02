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
    return await db.User_stamp.findAll();
}

async function getById(id) {
    return await getUser_stamp(id);
}

async function create(params) {
    // validate
    if (await db.User_stamp.findOne({ where: { stampid: params.stampid } })) {
        throw 'Stamp "' + params.stampid + '" is already registered';
    }
 
    const user_stamp = new db.User_stamp(params);
    
    // save user_stamp
    await user_stamp.save();
}

async function update(id, params) {
    const user_stamp = await getUser_stamp(id);

    // validate
    const user_stampChanged = params.stampid && user_stamp.stampid !== params.stampid;
    if (user_stampChanged && await db.User_stamp.findOne({ where: { stampid: params.stampid } })) {
        throw 'Stamp "' + params.stampid + '" is already registered';
    }

   // copy params to user_stamp and save
    Object.assign(user_stamp, params);
    await user_stamp.save();
}

async function _delete(id) {
    const user_stamp = await getUser_stamp(id);
    await user_stamp.destroy();
}

// helper functions

async function getUser_stamp(id) {
    const user_stamp = await db.User_stamp.findByPk(id);
    if (!user_stamp) throw 'Stamp not found';
    return user_stamp;
}
