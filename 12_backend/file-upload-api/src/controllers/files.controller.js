//file upload
export const uploadFile = async (req, res, next) => {
    try {
        console.log("reqfile :", req.file)
        const {originalname, mimetype, path, filename, size} = req.file;

        //validate file
        


        res.status(201).json({
            success: true,
            message: "File uploaded successfully"
        })
    } catch (err) {
        next(err)
    }
}

//get all files
export const getFiles = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "Files found successfully"
        })
    } catch (err) {
       next(err)
    }
}

//get single files
export const getFileById = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "File found successfully"
        })
    } catch (err) {
       next(err)
    }
}

//download file
export const downloadFileById = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "Download successfully"
        })
    } catch (err) {
       next(err)
    }
}

//delete file
export const deleteFileById = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "File deleted successfully"
        })
    } catch (err) {
       next(err)
    }
}