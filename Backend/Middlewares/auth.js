import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing", success: false });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing", success: false });
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (verify) {
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized Token", success: false });
    }
}

export default auth;
