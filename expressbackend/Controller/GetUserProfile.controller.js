const jwt = require('jsonwebtoken');  
const User = require('../Models/User');
bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const users = await User.db.collection('tableData').find({}).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user data' });
    }
};

module.exports = signup;
