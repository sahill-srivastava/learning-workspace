import { notes } from "../data/notes.js"

//create note
export const createNote = (req, res) => {
    try {

        notes.push(req.body)

        res.json({
            message: "note created",
            notes
        })
    } catch (err) {
        console.log(err)
    }
}

//get note
export const getNotes = (req, res) => {
    res.json({
        message: "notes founded successfully",
        notes
    })
}

//get single note
export const getSingleNote = (req, res) => {
    const note = notes.find(item => item.id === +(req.params.id))
    res.status(200).json({
        message: "note founded successfully",
        note
    })
}


//update note
export const updateNote = (req, res) => {

    const note = notes.find(item => item.id === +(req.params.id))
    note.title = req.body.title;
    Object.assign(note)
    res.status(200).json({
        message: "data is updated",
        notes
    })
}

//delete note
export const deleteNote = (req, res) => {
    
 const newNotes = notes.filter(item => item.id !== +(req.params.id))

 res.json({
    message: "note deleted successfully",
    newNotes
 })
}