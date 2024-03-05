import jwt from 'jsonwebtoken';

export const checkCurrentUser = async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization) {
        req.user = null;
        next();
    }
    else{
        const token = authorization.replace('Bearer ', '');
    }
    
    try {
        const { userId } = jwt.verify(token, process.env.APP_SECRET_KEY);
        req.user = { userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};