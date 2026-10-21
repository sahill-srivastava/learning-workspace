import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.status(404).json({ message: "Login Required" });
    }

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded;

    next();

}

export default userAuth;