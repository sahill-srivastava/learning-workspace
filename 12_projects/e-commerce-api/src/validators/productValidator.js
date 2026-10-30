import { z } from "zod";

export const productSchema = z.object({
    name: z.string({ error: "Product name is required" }).trim().nonempty({ error: "Product name is required" }).max(100, { error: "Name cannot exceed 100 characters" }),
    description: z.string({ error: "Description is required" }).trim().nonempty({ error: "Description is required" }).max(200, { error: "Description cannot exceed 200 characters" }),
    price: z.string({ error: "Price is required" }).trim().min(1, { error: "Price is required" }).pipe(z.coerce.number({ error: "Price must be a number" }).positive({ error: "Price must be greater than 0" })),
    stock: z.string({ error: "Stock is required" }).trim().min(1, { error: "Stock is required" }).pipe(z.coerce.number({ error: "Stock must be a number" }).int({ error: "Stock must be a whole number" }).nonnegative({ error: "Stock cannot be negative" })),
    isActive: z.enum(["true", "false"], { error: "isActive must be true or false" }).transform((v) => v === "true").default(true)
})