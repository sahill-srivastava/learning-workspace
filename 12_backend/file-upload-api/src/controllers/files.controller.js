//file upload
export const uploadFile = async (req, res) => {
    try {
        console.log("file :", req.file)

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