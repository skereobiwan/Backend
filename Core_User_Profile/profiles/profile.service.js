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
    return await db.Profile.findAll();
}

async function getById(id) {
    return await getProfile(id);
}

async function create(params) {
    // validate
    if (await db.Profile.findOne({ where: { userid: params.userid } })) {
        throw 'UID "' + params.userid + '" is already registered';
    }
 
    const profile = new db.Profile(params);
    
    
    // set validate false for verify
    profile.renaperValid = false;

    // save profile
    await profile.save();
}

async function update(id, params) {
    const profile = await getProfile(id);

    // validate
    const useridChanged = params.userid && profile.userid !== params.userid;
    if (useridChanged && await db.Profile.findOne({ where: { userid: params.userid } })) {
        throw 'UID "' + params.userid + '" is already registered';
    }

    // copy params to profile and save
    Object.assign(profile, params);
    await profile.save();
}

async function _delete(id) {
    const profile = await getProfile(id);
    await profile.destroy();
}

// helper functions

async function getProfile(id) {
    const profile = await db.Profile.findByPk(id);
    if (!profile) throw 'Profile not found';
    return profile;
}
