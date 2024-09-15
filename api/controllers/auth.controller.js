import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt, { sign } from 'jsonwebtoken';


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

        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
        const { password: pass, ...rest} = validUser._doc
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const google = async (req,res,next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try{
        const user = await User.findOne({email});
        if(user){

            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
            const {password, ...rest} = users._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassowrd = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassowrd,
                profilePicture: googlePhotoUrl, 
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, newUser.isAdmin}, process.env.JWT_SECRET);
            const { password, ...rest} = newUser._doc;
            res 
                .status(200)
                .cookie('access_token', token,{
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error){
        next(error)
    }
}