const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const bcrypt = require('bcrypt');

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One by ID
router.get('/:id', getUser, (req, res) => {
    res.json({ username: res.user.username, email: res.user.email });
})

// Getting One based on username
router.get('/username/:username', getUserByUsername, (req, res) => {
    res.json({ username: res.user.username, email: res.user.email, id: res.user._id });
})

// Getting One based on email
router.get('/email/:email', getUserByEmail, (req, res) => {
    res.json({ username: res.user.username, email: res.user.email, id: res.user._id });
})

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await Users.findOne({ username });
  
      if (user) {
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          // Authentication successful
          res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email, id: user._id } });
        } else {
          // Incorrect password
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        // User not found
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Creating One
router.post('/', async (req, res) => {

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.nausernameme != null) {
        res.user.username = req.body.username
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    try {
        const updatedUser = await res.user.save()
        res.status(201).json(updatedUser)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: "Deleted User" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await Users.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

async function getUserByUsername(req, res, next) {
    let user
    try {
        user = await Users.findOne({ username: req.params.username });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

async function getUserByEmail(req, res, next) {
    let user
    try {
        user = await Users.findOne({ email: req.params.email });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}


module.exports = router