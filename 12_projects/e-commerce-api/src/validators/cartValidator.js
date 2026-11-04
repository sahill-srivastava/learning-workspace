import { z } from "zod";

export const cartSchema = z.object({
    productId: z.string().trim().min(1, "Product id is required"),
    quantity: z.int("Quantity must be a whole number").positive("Quantity must be greater than 0").max(100, "Maximum quantity is 100")
})