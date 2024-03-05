import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization) {
        const error = new Error('Invalid authorization');
        error.statusCode = 401;
        return next(error);
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const { userId } = jwt.verify(token, process.env.APP_SECRET_KEY);
        req.user = { userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};