//Modules protect their variables and function from leaking

console.log("Sum executed")

let x = "hello world";

// console.log(x)

function add(a, b) {
    return a + b;
}

module.exports = {
    x,
    add
}