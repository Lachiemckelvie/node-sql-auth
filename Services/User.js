const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/db');

module.exports = {
    create,
    getAll,
    getById,
    update,
    authenticate
};

async function authenticate({username, password}) {
    const user = await db.User.findOne({ where: {username}}) 

    if (!user || !(await bcrypt.compare(password, user.hash))) {
        "Username or password was incorrect";
    }

    // auth success
    const token = jwt.sign( {sub: user.id}, config.secret, {expiresIn: '30d'} );
    return { ...user.get(), token }
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}

async function getAll(params) {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id)
}

async function getUser(id) {
    const user = await db.User.findByPk(id);

    if (!user) {
        throw "No user found";
    }
    return user;
}

async function update(params) {
    const user = await getUser(params.id);

    if (!user) {
        throw "User not found";
    }
    
    // copy params to user and save
    Object.assign(user, params);

    await user.save();
    return user.get();
}