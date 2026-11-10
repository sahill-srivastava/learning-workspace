import { z } from "zod"

const categorySchema = z.object({
    name: z.string({ error: "Category name is required" }).trim().nonempty({ error: "Category name is required" }).max(100, { error: "Category cannot exceed 100 characters" }),
    isActive: z.enum(["true", "false"], { error: "Status must be true or false" }).transform((v) => v === "true").default(true)
})

export const categoryUpdateSchema = z.object({
    name: z.string({ error: "Category name is required" }).trim().nonempty({ error: "Category name is required" }).max(100, { error: "Category cannot exceed 100 characters" }).optional(),
    isActive: z.enum(["true", "false"], { error: "Status must be true or false" }).transform((v) => v === "true").optional()
})

export default categorySchema;