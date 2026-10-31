export const validate = (schema) => {

    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        console.log(result)

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues[0]?.message
            })
        }

        req.body = result.data;

        next();

    }
}