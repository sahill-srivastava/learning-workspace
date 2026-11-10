
import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        throw new Error("Login required");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decode;

    next();

}

export default userAuth;