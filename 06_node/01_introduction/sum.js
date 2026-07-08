//Modules protect their variables and function from leaking

console.log("Sum executed")

let x = "hello world";

console.log(x)

function sum(a, b) {
    const sum  = a + b;

    console.log(sum)
}