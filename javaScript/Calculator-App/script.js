const buttons = document.querySelectorAll(".btn-key");
const input = document.getElementById("inputBox");
const button = Array.from(buttons);



let result = "";

button.forEach((btn) => {
  btn.addEventListener("click", (e) => {

    let value = e.target.innerHTML;

    if(value == "="){
      result = eval(result);
      input.value = result;
    }
    else if( value == "AC"){
      result = "";
      input.value = result;
    }
    else if( value == "DEL"){
      result = result.substring(0, result.length - 1);
      input.value = result;
    }
    else{
      result += value;
      input.value = result;
    }


  })
})

// keyboard 

document.addEventListener("keydown", (e) => {

    let value = e.key;
    

    if(value == "="){
      result = eval(result);
      input.value = result;
    }
    else if( value == "AC"){
      result = "";
      input.value = result;
    }
    else if( value == "DEL"){
      result = result.substring(0, result.length - 1);
      input.value = result;
    }
    else{
       result += value;
    }
})