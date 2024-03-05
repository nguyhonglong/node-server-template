import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.APP_SECRET_KEY)
        res.status(200).json({
            status: 'success',
            data: { token, user: user.name }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            const error = new Error('Email is not found');
            error.statusCode = 400;
            return next(error);
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
            const payload = { userId: user._id };
            const token = jwt.sign(payload, process.env.APP_SECRET_KEY);
            res.status(200).json({
                status: 'success',
                data: { token, user: user.name }
            });
        } else {
            const error = new Error('Password is not correct');
            error.statusCode = 400;
            return next(error);
        }
    } catch (error) {
        res.json({error: error.message});
    }
};


export const  getCurrentUser = async (req, res, next) =>{
    try {
        const data = {user : null};
        if (req.user){
            const user = await User.findOne({_id: req.user.userId});
            data.user = {userName: user.name};
        }
        res.status(200).json({
            status:'success',
            data: data
        })
    } catch (error) {
        res.json({error: error.message});
    }
}
