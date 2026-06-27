export const checkValidateData = (
    isSignIn,
    name,
    email,
    password
) => {

    if (!isSignIn) {
        const isNameValid =
            /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name.trim());

        if (!isNameValid) return "Name is not valid";
    }

    const isEmailValid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/.test(email.trim());

    const isPasswordValid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password);

    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is not valid";

    return null;
};