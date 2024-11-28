import  jwt  from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';


export const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'Token required' });
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};


