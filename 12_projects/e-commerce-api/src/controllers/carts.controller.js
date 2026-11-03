//add to cart
export const addToCart = async (req, res, next) => {
    try {

         res.status(201).json({
            success: true,
            message: "Cart created successfully",
        })

    } catch (err) {
        next(err)
    }
}

//getUserCart
export const getUserCart = async (req, res, next) => {
    try {

         res.status(200).json({
            success: true,
            message: "Cart found successfully",
        })

    } catch (err) {
        next(err)
    }
}

//updateProductQuantity
export const updateProductQuantity = async (req, res, next) => {
    try {

         res.status(200).json({
            success: true,
            message: "Cart updated successfully",
        })

    } catch (err) {
        next(err)
    }
}

//removeProductFromCart
export const removeProductFromCart = async (req, res, next) => {
    try {

         res.status(200).json({
            success: true,
            message: "Cart removed successfully",
        })

    } catch (err) {
        next(err)
    }
}

//clearCart
export const clearCart = async (req, res, next) => {
    try {

         res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        })

    } catch (err) {
        next(err)
    }
}