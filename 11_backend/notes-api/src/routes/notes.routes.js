import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "notes api is working"
    })
})

router.get("/:id", (req, res) => {

    console.log(req.params.id)
      res.json({
        idss: req.params.id
    })

})

export default router;