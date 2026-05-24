// DOM refs
const container = document.querySelector(".container");

const displayEl = document.getElementById("text_display");
const copyEl = document.getElementById("copy_button");

const lengthEl = document.getElementById("pass_length");
const countEl = document.querySelector(".password_count");


const checksListEl = document.querySelector(".checks_list");
const checksEl = document.querySelectorAll(".checks");

const genBtnEl = document.getElementById("generate_button");

/*------------------------- State ---------------------------*/

const state = {
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
}

const CHARSETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
}

/*----------------------------Logic functions-----------------*/

// update state
function updateState(e) {
    const { id, checked } = e.target;

    state[id] = checked;

}

// ensure atleast one check
function checkSelectedBox(e) {

    let count = 0;
    const warn = container.querySelector(".warning");

    for (let val of Object.values(state)) {

        if (val === true) {
            count++
        }
    }

    if (count < 1) {
        const p = document.createElement("p");
        p.textContent = "Select atleast one..."
        p.classList.add("warning");

        // avoid duplicate
        if (!warn) {
            checksListEl.appendChild(p);
        }


        // atleast one checked
        e.target.checked = true;
        const { id, checked } = e.target;
        state[id] = checked;
    }

    if (count > 1) {
        if (warn) warn.remove();
    }

}

function generatePass(length, state) {

    let pool = "";

    if (state.uppercase) pool += CHARSETS.uppercase;
    if (state.lowercase) pool += CHARSETS.lowercase;
    if (state.numbers) pool += CHARSETS.numbers;
    if (state.symbols) pool += CHARSETS.symbols;

    if (!pool) return "";

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(Math.random() * pool.length);
        const randomChar = pool[randomIndex];

        password += randomChar;
    }

    return password;
}



/*------------------------- UI functions ----------------------*/

function resetDisplay() {
    displayEl.value = "";
}

function init() {
    lengthEl.value = state.length;
    countEl.textContent = state.length;
    checksEl.forEach(checkEl => {
        const input = checkEl.children[0];
        const name = input.id;
        checkEl.children[0].checked = state[name]
    })
}

function renderUi() {

    // clear input display
    if (displayEl.value) {
        resetDisplay();
    }

    const password = generatePass(state.length, state);

    displayEl.value = password;
}


/*-------------------------Inputs---------------------------*/

lengthEl.addEventListener("input", () => {
    const length = +(lengthEl.value);
    countEl.textContent = length;

    // clear input display
    if (displayEl.value) {
        resetDisplay();
    }

    state.length = length;
})


checksEl.forEach(checkEl => {
    checkEl.addEventListener("change", (e) => {

        // clear input display
        if (displayEl.value) {
            resetDisplay();
        }

        updateState(e);
        checkSelectedBox(e);
    })
})


/*------------------------------On First load -------------------*/

resetDisplay();
init();


/*---------------------------Output----------------------------*/

genBtnEl.addEventListener("click", () => {
    renderUi();
});

copyEl.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(displayEl.value);

        copyEl.innerHTML = `<i class="fa-solid fa-clipboard-check"></i>`;

        setTimeout(() => {
            copyEl.innerHTML = `<i class="fa-solid fa-copy"></i>`;
        }, 800)
    } catch (err) {
        console.error("Copy failed", err);
    }
})
