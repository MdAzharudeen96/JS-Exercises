const fromSelect = document.querySelector(".from-select");
const toSelect = document.querySelector(".to-select");
const amount = document.querySelector(".amount input");
const amountRate = document.querySelector(".amount-rate");
const resultBox = document.querySelector(".result-box")

var fromValue = '';
var toValue = '';

function baseCode(){
    fromSelect.innerHTML = '<option value="From" selected>Select Currency</option>';
    toSelect.innerHTML = '<option value="From" selected>Select Currency</option>';
    let url = "https://v6.exchangerate-api.com/v6/2d0e548ecb8d80c5f5c6f30c/latest/INR";
    fetch(url)
    .then(res => res.json())
    .then(out => {
        // console.log(out.conversion_rates);
        Object.keys(out.conversion_rates).forEach((data) => {
            fromSelect.innerHTML += `<option value=${data}>${data}</option>`;
            toSelect.innerHTML += `<option value=${data}>${data}</option>`;
        });
    });
};
baseCode();

fromSelect.addEventListener("change", function () {
    fromValue = this.value;
    console.log(fromValue);
});

toSelect.addEventListener("change", function(){
    toValue = this.value;
    console.log(toValue)
});

function getExchange(){
    const inputAmount = amount.value;
    // console.log(inputAmount);
    if(!fromValue){
        alert("Please Select From Currency!");
    }else if(!toValue){
        alert("Please Select To Currency!");
    }else{
        let url = `https://v6.exchangerate-api.com/v6/2d0e548ecb8d80c5f5c6f30c/latest/${fromValue}`;
        console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(out => {
            // console.log(out.conversion_rates[toValue])
            amountValue = out.conversion_rates[toValue];
            amountRate.innerHTML = `<p>1 ${fromValue} equals to ${amountValue} ${toValue}`;
            exchangedAmount = (amountValue * inputAmount).toFixed(3);
            // console.log(exchangedAmount);
            resultBox.classList.remove("hidden");
            resultBox.innerHTML = `
                <h6>Amount Converted</h6>
                <p>${inputAmount} ${fromValue} = ${exchangedAmount} ${toValue}</p>
            `;

        });
    }

};
