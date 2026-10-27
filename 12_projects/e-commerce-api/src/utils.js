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
  
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(role)
    console.log(address)
    return {
        name: name.trim(),
        email,
        password
    };
}