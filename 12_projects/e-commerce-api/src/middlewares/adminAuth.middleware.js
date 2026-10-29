export const adminAuth = async (req, res, next) => {

    if (!req.user) {
        throw new Error("Internal server error")
    }

    const { role } = req.user;

    if (role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        })
    }

    next();
}