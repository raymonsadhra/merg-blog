import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === '') {

        return res.status(400).json({ message: 'All fields are required '}); 
    }
    const hashedPassowrd = bcryptjs.hashSync(password, 10);

    const newUser =  new User({
        username,
        email,
        password: hashedPassowrd,
    });
    try{

        await newUser.save();
        res.json('signup successful');
    } catch (error){
        res.status(500).json({message: error.message});
    }

    await newUser.save();
    res.json('signup succesful');
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(404).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest} = validUser._doc
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
