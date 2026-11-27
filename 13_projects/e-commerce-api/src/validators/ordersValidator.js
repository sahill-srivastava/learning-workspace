import z from "zod";
import validator from "validator"

const shippingAddressSchema = z.object({
    name: z.string().trim().min(2, "Name must contain at least two characters").max(100, "Name cannot exceed 100 characters"),
    phone: z.string().trim().refine(val => validator.isMobilePhone(val, "en-IN"), { message: "Invalid phone number" }),
    address: z.string().trim().min(5, "Address must contain at least 5 characters").max(250, "Address cannot exceed 250 characters"),
    city: z.string().trim().min(2).max(100),
    state: z.string().trim().min(2).max(100),
    pincode: z.string().regex(/^[1-9]\d{5}$/, "Invalid Indian PIN code")
})


const orderSchema = z.object({
    shippingAddress: shippingAddressSchema,
    paymentMethod: z.enum(["COD", "Online"])
});

export default orderSchema;