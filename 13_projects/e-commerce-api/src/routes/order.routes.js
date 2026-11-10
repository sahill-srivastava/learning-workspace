import express from "express";

const router = express.Router();

router.post("/", createOrder)
router.get("/", getAllOrders)
router.get("/", getOrder)
router.patch("/", updateOrder)
router.delete("/", deleteOrder)

export default router;