import app from "./app.js"

app.listen(process.env.PORT_NO, process.env.HOST_NAME, () => {
    console.log(`Server is listening on http://${process.env.HOST_NAME}:${process.env.PORT_NO}`)
})
