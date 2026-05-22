import cookie_parser from 'cookie-parser'
import User from '../models/user.model.js';
import JWT from 'jsonwebtoken'
async function isAuthenticate(req, res, next) {
    try {
        const token = req?.cookies?.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'token is not found'
            })
        }
        const decoded =  JWT.verify(token, process?.env?.SECRET_KEY)
        const id = decoded?.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id is not found'
            })
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user is not found'
            })
        }
        req.id = user._id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'backend error in the isAuthenticate function'
        })
    }
}
export default isAuthenticate;