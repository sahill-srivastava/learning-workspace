import { z } from "zod";
import validator from "validator"

export const userSchema = z.object({
    name: z.string({ error: "Name is required" }).trim().nonempty({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).trim().toLowerCase().nonempty({ error: "Email is required" }).refine(val => validator.isEmail(val), { error: "Invalid email" }),
    password: z.string({ error: "Password is required" }).nonempty({ error: "Password is required" }).refine(val => validator.isStrongPassword(val), { error: "Password must be 8+ characters with uppercase, lowercase, a number and a symbol" }),
    role: z.enum(["user", "admin"], { error: "Invalid role" }).default("user"),
    address: z.string({ error: "Address is required" }).trim().nonempty({ error: "Address is required" })
})
