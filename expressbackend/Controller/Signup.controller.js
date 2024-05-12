const jwt = require('jsonwebtoken');  
const User = require('../Models/User');
bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
        console.log("Please enter all fields");
        return res.json({ message: "Please enter all fields" });

    }

    let userfound = await User.findOne({ email: email });
    if (userfound) {

        console.log("User already exists");
        return res.json({ message: "User already exists" });
    } else {
        let updatepassword = await bcrypt.hash(password, 10);
        const person = new User({
            username: username, // Add the username field
            email: email,
            password: updatepassword,
        });

        await person.save();
    }
    console.log("User created successfully");   
    return res.status(200).json({ message: "User created successfully" });
};

module.exports = signup;
