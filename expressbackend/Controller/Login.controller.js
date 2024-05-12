usermodel = require('../Models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password; 
    console.log(email,password);
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    let userfound = await usermodel.findOne({ email: email });
    if (!userfound) {
        return res.status(400).json({ message: "User does not exist" });
    } else {
        let passwordmatch = await bcrypt.compare(password, userfound.password);
        if (!passwordmatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        } else {
            const token = jwt.sign({ id: userfound._id }, 'secret', { expiresIn: 3600 });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ message: "User logged in successfully" });
        }
    }

}
module.exports = login;