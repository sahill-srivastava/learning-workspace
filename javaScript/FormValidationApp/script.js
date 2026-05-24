// DOM refs
const formEl = document.getElementById("form");

const nameEl = document.getElementById("name")
const emailEl = document.getElementById("email")
const passwordEl = document.getElementById("password")
const confirmPassEl = document.getElementById("confirm_password")

const showHideBtn = document.querySelector(".showhide_toggle");
const termsConditionsBtn = document.getElementById("terms_conditions");
const submitBtn = document.getElementById("submit_button");

const successMsgEl = document.querySelector(".success_msg");


/*----------------------------States-------------------------*/

const state = {
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    termsConditions: false
};

const errors = {
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    termConditions: ""
};

const errorEls = {
    name: nameEl.nextElementSibling,
    email: emailEl.nextElementSibling,
    password: passwordEl.closest(".form_group").querySelector(".error_message"),
    confirmPass: confirmPassEl.nextElementSibling,
    termConditions: termsConditionsBtn.closest(".form_group").querySelector(".error_message"),
}

const PASS_RULES = {
    length: {
        test: function (pw) {
            return pw.length >= 8;
        },
        msg: "At least 8 characters"
    },
    upperCase: {
        test: function (pw) {
            return /[A-Z]/.test(pw);
        },
        msg: "At least one uppercase"
    },
    lowerCase: {
        test: function (pw) {
            return /[a-z]/.test(pw);
        },
        msg: "At least one lowercase"
    },
    number: {
        test: function (pw) {
            return /[0-9]/.test(pw);
        },
        msg: "At least one number"
    },
    special: {
        test: function (pw) {
            return /[^A-Za-z0-9]/.test(pw);
        },
        msg: "At least special char"
    }
}


/*-------------------------Helper Functions-------------------------*/

function validateName(name) {

    const NAME_RE = /^[A-Za-z ]+$/;

    if (name.length === 0) {
        errors.name = "Please fill this field!";
    } else if (name.length < 3) {
        errors.name = "Name should have atleast 3 chars...";
    } else if (!NAME_RE.test(name)) {
        //check letters
        errors.name = "Only letters allowed";

    } else {
        errors.name = "";
    }
}

function handleNameInput(e) {
    const value = e.target.value;

    // update name state
    state.name = value;

    validateName(value);

    renderUI();

}

function validateEmail(email) {

    const EMAIL_RE = /^[a-z0-9._-]+@[a-z]+\.[a-z]{2,3}$/;

    if (email.length === 0) {
        errors.email = "Please fill this field!";
    } else if (!EMAIL_RE.test(email)) {
        errors.email = "Invalid Mail";
    } else {
        errors.email = "";
    }

}

function handleEmailInput(e) {

    const value = e.target.value;

    state.email = value;

    validateEmail(value);

    renderUI();
}

function showHide() {

    //clear succes msg
    detectSuccessMsg();

    if (passwordEl.type === "password") {
        passwordEl.type = "text";
        confirmPassEl.type = "text";
        showHideBtn.textContent = "Hide";
    } else {
        passwordEl.type = "password";
        confirmPassEl.type = "password";
        showHideBtn.textContent = "Show";
    }

}

function validatePass(password) {

    if (password.length === 0) {
        errors.password = "Please fill this field!";
    }
    else if (!PASS_RULES.length.test(password)) {
        errors.password = PASS_RULES.length.msg;
    }
    else if (!PASS_RULES.upperCase.test(password)) {
        errors.password = PASS_RULES.upperCase.msg;
    }
    else if (!PASS_RULES.lowerCase.test(password)) {
        errors.password = PASS_RULES.lowerCase.msg;
    }
    else if (!PASS_RULES.number.test(password)) {
        errors.password = PASS_RULES.number.msg;
    }
    else if (!PASS_RULES.special.test(password)) {
        errors.password = PASS_RULES.special.msg;
    }
    else {
        errors.password = "";
    }

}


function handlePassInput(e) {

    const value = e.target.value;

    state.password = value;

    validatePass(value);

    renderUI();
}

function validateConfirmPass(confirmPass) {

    if (confirmPass.length === 0) {
        errors.confirmPass = "Please fill this field!";
    } else if (confirmPass !== state.password) {
        errors.confirmPass = "Passwords do not match.";
    } else {
        errors.confirmPass = "";
    }

}

function handleConfirmPassInput(e) {

    const value = e.target.value;

    state.confirmPass = value;

    validateConfirmPass(value);

    renderUI();
}

function termsnConditions() {

    //clear succes msg
    detectSuccessMsg();

    if (termsConditionsBtn.checked) {
        state.termsConditions = true;
        errors.termConditions = "";
    } else {
        state.termsConditions = false;
        errors.termConditions = "You must accept the terms.";
    }


    renderUI();

}

function reset() {

    //reset form inputs
    formEl.reset();

    //reset states
    state.name = "";
    state.email = "";
    state.password = "";
    state.confirmPass = "";
    state.termsConditions = false;

    //reset errors
    errors.name = "";
    errors.email = "";
    errors.password = "";
    errors.confirmPass = "";
    errors.termConditions = "";

};

function detectSuccessMsg() {

        successMsgEl.textContent = "";

}
/*-------------------------Logic Functions-------------------------*/

function formSubmit(e) {

    e.preventDefault();

    validateName(state.name)
    validateEmail(state.email)
    validatePass(state.password)
    validateConfirmPass(state.confirmPass)
    termsnConditions();

    renderUI();

    const hasValue = Object.values(errors).some(value => value !== "");
    if (hasValue) {
        return;
    } else {
        successMsgEl.textContent = "Your form is successfully submitted.";

        //reset
        reset();

        renderUI();
    }



}

/*-------------------------UI Functions-------------------------*/

function renderUI() {
    for (let field in errors) {
        errorEls[field].textContent = errors[field]
    }
};


/*----------------------------Events Listeners-------------------------*/

nameEl.addEventListener("input", handleNameInput);
nameEl.addEventListener("focus", detectSuccessMsg);

emailEl.addEventListener("input", handleEmailInput);
emailEl.addEventListener("focus", detectSuccessMsg);

passwordEl.addEventListener("input", handlePassInput);
passwordEl.addEventListener("focus", detectSuccessMsg);

confirmPassEl.addEventListener("input", handleConfirmPassInput);
confirmPassEl.addEventListener("focus", detectSuccessMsg);

submitBtn.addEventListener("click", formSubmit)

showHideBtn.addEventListener("click", showHide)

termsConditionsBtn.addEventListener("click", termsnConditions)


//S@hil5678







