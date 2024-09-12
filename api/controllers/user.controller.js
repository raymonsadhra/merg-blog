import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const test = (req, res)=>{
    res.json({ message: 'API is working!' });

};

export const updateUser = async (req,res,next) => {
    if(req.user.id!=req.params.userId){
        return next(errorHandler(403,'You cannot update this user'));
    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(errorHandler(400,'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
        
    }
    if(req.body.username){
        if(req.body.user.length<7 || req.body.user.length>20){
            return next(errorHandler(400, 'username must be between 7 and 20 characters'));
        }
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400, 'username cannot contain space'));
    }
    if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler(400, 'username must be lowercase'));
    }
    if(req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400, 'username can only contain letters and numbers'));
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            },
        }, {new: true});
        const { password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}; 

export const deleteUser = async (req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You cannot delete this user'));
    }
    try {
        await User.findByIdAndUpdate(req.params.userId);
        res.status(200).json("user has been deleted");
    } catch (error) {
        next(error)
    }
}