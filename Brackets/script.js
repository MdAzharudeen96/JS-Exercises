const inputField = document.querySelector(".input_field");
const resultField = document.getElementById("result");

const openBrackets = ["{" , "[", "("];
const closeBrackets = ["}", "]", ")"];
const matchingBrackets = {
    "}":"{",
    "]":"[",
    ")":"(",
}

function checkBrackets(){
    let arr = inputField.value.trim();
    arr = arr.split(" ").join("");
    // console.log(arr);
    var lastOpener = [];
    if(arr.length>0 && arr.includes("{") || arr.includes("}") || arr.includes("[") 
                    || arr.includes("[") || arr.includes("(") || arr.includes(")")){
        for (i in arr){
            console.log(arr[i]);
            if(openBrackets.includes(arr[i])){
                lastOpener.push(arr[i]);
                console.log("Opener",lastOpener);
            }
            if(closeBrackets.includes(arr[i])){
                const last = lastOpener.pop();
                // console.log("Item Poped")
                // console.log("closer",lastOpener);
                // console.log(last)
                if(last !== matchingBrackets[arr[i]]) {
                    // console.log("Item Poped")
                    // console.log("closer",lastOpener);
                    return textResult("red", false);
                }
                    
            }
        }
        if(lastOpener.length == 0){
            return textResult("green", true);
        }else{
            return textResult("red", false);
        }
    }else{
        alert("Please give valid Input!");
    }
    
}

function textResult(color, val) {
    resultField.classList.add(color);
    if(val===false) resultField.innerText = "False, Brakcets are not closed properly.";
    if(val===true) resultField.innerText = "True, Brakcets are closed properly.";

    setTimeout(function () {
        clearField(color);
    },5000);
}

function clearField(color) {
    console.log(color)
    inputField.value = '';   
    resultField.classList.remove(color);
    resultField.innerText = '';
}

//Sample Input
// console.log(checkBrackets("{ [ ] ( ) }"));
// console.log(checkBrackets("{ [ ( ] ) }"));
// console.log(checkBrackets("{ [ }"));
// console.log(checkBrackets(""));
// console.log(checkBrackets("{{"));
// console.log(checkBrackets("]]"))
// console.log(checkBrackets("ajfldfjl"));
// console.log(checkBrackets("{dfdl}"));
// console.log(checkBrackets("]{djuei}"))