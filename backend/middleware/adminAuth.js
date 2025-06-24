import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token not provided' });
    }

    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token content:", token_decoded); // ✅ Debug

        if (!token_decoded.id) {
            return res.status(403).json({ success: false, message: "Invalid Token Structure" });
        }

        req.userId = token_decoded.id;
        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        res.status(401).json({ success: false, message: "Token is invalid or expired" });
    }
};

export default authUser;
