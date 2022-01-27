const inputField = document.querySelector(".input");
const outputField = document.querySelector(".output-container")
const resultTable = document.querySelector(".table-body")
const clrBtn = document.querySelector(".clear");

function stringValidation(){
    let str = inputField.value.trim().toLowerCase()
    console.log(str)
    var regEx = /[@#$%^&*()_+\-=\[\]{}\\|<>\/]+/;

    //check the string contains non-standard punctuations
    if(!str.match(regEx) && !/\d/.test(str) && str!="" ){
        var trimmedStr = str.replace(/[\.,!?:;.'"]/g, '');
        // console.log(trimmedStr);
        var strArray = trimmedStr.split(' ').sort();
        countWords(strArray);
    }else{
        alert("The input will only contain words and standard punctuation.");
    }
}

countWords = (arr) =>{
    var totalWords = {}
    console.log(arr, arr.length);
    arr.forEach((word) => {
        totalWords[word] = totalWords[word] || 0;
        totalWords[word]++;
    });
    console.log(totalWords);
    wordConstructor(totalWords);
};

wordConstructor = (totalWords) => {
    var tempResult = []

    for (data in totalWords){
        tempResult.push({
            word: data,
            count: totalWords[data]
        });
    }
    // console.log(tempResult);
    outputField.classList.remove("hidden");
    resultTable.innerHTML='';
    tempResult.forEach((result) => {
        resultTable.innerHTML += `
        <tr>
            <td>${result.word}</td>
            <td>${result.count}</td>
        </tr>
        `;
    });
}

clrBtn.addEventListener("click", () => {
    inputField.value = "";
    outputField.classList.add("hidden");
});