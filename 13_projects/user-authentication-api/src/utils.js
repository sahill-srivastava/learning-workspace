import validator from "validator";

export const validateSignUp = (body) => {
    let { name, email, password } = body;

    if (!name) {
        throw new Error("Name is required");
    }

    if (!email) {
        throw new Error("Email is required");
    }

    const normalizedEmail = email.trim();

    if (!validator.isEmail(normalizedEmail)) {
        throw new Error("Invalid Email")
    }

    if (!password) {
        throw new Error("Password is required");
    }

    const normalizedPassword = password.trim();

    if (!validator.isStrongPassword(normalizedPassword)) {
        throw new Error("Invalid Password")
    }

    return {
        name: name.trim(),
        email: normalizedEmail,
        password: normalizedPassword
    }

}

export const validateLogIn = (body) => {
    let { email, password } = body;

    if (!email) {
        throw new Error("Email is required");
    }

    const normalizedEmail = email.trim();

    if (!validator.isEmail(normalizedEmail)) {
        throw new Error("Invalid Email")
    }

    if (!password) {
        throw new Error("Password is required");
    }

    const normalizedPassword = password.trim();

    if (!validator.isStrongPassword(normalizedPassword)) {
        throw new Error("Invalid Password")
    }

    return {
        email: normalizedEmail,
        password: normalizedPassword
    }

}
