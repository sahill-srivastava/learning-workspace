//file upload
export const uploadFile = async (req, res) => {
    try {
        console.log("file :", req.file)
        const {originalname, mimetype, path, filename, size} = req.file;

        //validate file
        if(size > 5 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: "Max 5MB allowed"
            })
        }

        const allowedMimetype = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

        if(!allowedMimetype.includes(mimetype)){
             return res.status(400).json({
                success: false,
                message: "Only JPEG, PNG, WebP and PDF are allowed"
            })
        }


        res.status(201).json({
            success: true,
            message: "File uploaded successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//get all files
export const getFiles = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            message: "Files found successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//get single files
export const getFileById = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            message: "File found successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//download file
export const downloadFileById = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            message: "Download successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//delete file
export const deleteFileById = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            message: "File deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}