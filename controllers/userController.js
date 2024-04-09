const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user === null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.json({ username: user.username, email: user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserByUsername = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);
        if (user === null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.json({ username: user.username, email: user.email, id: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        if (user === null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.json({ username: user.username, email: user.email, id: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.loginUser(username, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email, id: user._id } });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (updatedUser === null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.status(201).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ message: "Deleted User" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};