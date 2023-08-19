const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../../users/users-model.js');

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        let user = req.body;

        if (!user.username || !user.password) {
            return res.status(400).json({ message: "username and password required" });
        }

        const existingUser = await Users.findBy({ username: user.username });
        if (existingUser && existingUser.length) {
            return res.status(400).json({ message: "username taken" });
        }

        const hash = bcrypt.hashSync(user.password, 8); // Hashing with 8 rounds as specified.
        user.password = hash;

        const saved = await Users.add(user); 
        res.status(201).json(saved);

    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {
    console.log("User login info:", req.body);
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "username and password required" });
        }

        const user = await Users.findBy({ username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "invalid credentials" });
        }

        const token = generateToken(user);
        res.status(200).json({ message: `welcome, ${user.username}`, token });
        console.log("Generated token:", token);

    } catch (error) {
        res.status(500).json(error);
    }
});

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, process.env.SECRET || "shh", options);
}

module.exports = router;

