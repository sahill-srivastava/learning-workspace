import validator from "validator"

export const validateUser = (reqBody) => {
    const {name, email, password, role, address } = reqBody;

    //name
    if (typeof name !== "string" || !name.trim()) {
        throw new Error("Name is required")
    }

    //email
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email")
    }

    //password
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong and contain atleast 8 digits")
    }

    //role
    if (typeof role !== "string" || !role.trim()) {
        throw new Error("Role is required")
    }
    const allowedRoles = ["user", "admin"];

    if(!allowedRoles.includes(role.trim())){
         throw new Error("Invalid role")
    }

    //address
    if (typeof address !== "string" || !address.trim()) {
        throw new Error("Address is required")
    }

    return {
        name: name.trim(),
        email,
        password,
        role: role.trim(),
        address: address.trim()
    };
}