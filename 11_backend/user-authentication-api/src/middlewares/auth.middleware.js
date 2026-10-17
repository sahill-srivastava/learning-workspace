import jwt from "jsonwebtoken"
export const userAuth = (req, res, next) => {
    try {

        const token = req.cookies.token;

        if(!token) {
            throw new Error ("Login Required")
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
       
        next();
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}