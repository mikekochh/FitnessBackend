const Users = require('../models/users');
const bcrypt = require('bcrypt');

exports.getAllUsers = async () => {
    return await Users.find();
};

exports.getUserById = async (id) => {
    return await Users.findById(id);
};

exports.getUserByUsername = async (username) => {
    return await Users.findOne({ username });
};

exports.getUserByEmail = async (email) => {
    return await Users.findOne({ email });
};

exports.loginUser = async (username, password) => {
    const user = await Users.findOne({ username });

    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return user;
        }
    }
    return null;
};

exports.createUser = async (userData) => {
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = new Users({
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    });

    return await user.save();
};

exports.updateUser = async (id, updateData) => {
    const user = await Users.findById(id);

    if (user === null) {
        return null;
    }

    if (updateData.username != null) {
        user.username = updateData.username;
    }
    if (updateData.email != null) {
        user.email = updateData.email;
    }
    if (updateData.password != null) {
        user.password = updateData.password;
    }

    return await user.save();
};

exports.deleteUser = async (id) => {
    await Users.findByIdAndDelete(id);
};