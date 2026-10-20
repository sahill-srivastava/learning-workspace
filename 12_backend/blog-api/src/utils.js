import validator from "validator"
export const validateSignUp = (body) => {
    const {name, email, password} = body;

    if(!name) {
        throw new Error("Name is required");
    }

    if(!email){
        throw new Error("Email is required");
    }

    const normalizedEmail = email.trim();

    if(!validator.isEmail(normalizedEmail)){
        throw new Error("Invalid Email")
    }

    if(!password) {
        throw new Error("Password is required")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Invalid Password");
    }


    return {
        name: name.trim(),
        email: normalizedEmail,
        password
    };
}

//validate login
export const validateLogIn = (body) => {
    const { email, password } = body;

    if(!email) {
        throw new Error("Email is required");
    }

    const normalizedEmail = email.trim().toLowerCase();

    if(!validator.isEmail(normalizedEmail)){
        throw new Error("Invalid Email")
    }

    if(!password) {
        throw new Error("Password is required");
    }

    return {
        email: normalizedEmail,
        password
    }


}