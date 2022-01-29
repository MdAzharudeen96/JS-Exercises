const hobbystList = document.querySelector(".hobbyists-list");
const hobbyInput = document.querySelector(".hobby-input");
const personName = document.querySelector(".name");
const hobbyOne = document.querySelector(".hobby-one");
const hobbyTwo = document.querySelector(".hobby-two");
const hobbyThree = document.querySelector(".hobby-three");
const clrBtn = document.querySelector(".clear");
const successAlert = document.querySelector(".success");

const hobbyistArray = {};
const hobbyistsList = [];

//Push Hobbyists into List
Object.prototype.getKeyByValue = function( value ) {
    console.log(this)
    for( var prop in this) {
        console.log(prop)
        if(this.hasOwnProperty(prop)){
            this[prop].forEach((hobby) => {
                // console.log(prop, hobby,value)
                if(hobby === value){
                    // console.log(prop);
                    hobbyistsList.push(prop);
                }
            });    
        }
    }
    if(hobbyistsList.length===0){
        alert("Sorry! No one have this Hobby.");
    }
}

//Get Input
function findAllHobbyists(){
    hobby = hobbyInput.value;
    console.log(hobby)
    if(hobby !== ''){
        hobbies = JSON.parse(localStorage.getItem('hobbyistsList') || "[]");
        // console.log(hobbies)
        hobbies.getKeyByValue(hobby);
        // console.log(hobbyistsList)
        hobbystList.innerHTML = '';
        hobbyistsList.forEach((person) => {
            hobbystList.innerHTML += `<li>${person}</li>`
        });
    }else{
        alert("Please give any Hobby!")
    }   
};

//Add Hobbies
function addHobbyists(){
    hName = personName.value;
    hobby = [hobbyOne.value, hobbyTwo.value, hobbyThree.value];
    if(hName === '' || hobbyOne.value ==='') {
        alert("Please enter Name & give atleast one Hobby.");
    }else{
        var filteredHobby = hobby.filter((el)=>{
            return el!=='';
        });
        console.log(filteredHobby)
        hobbyistArray[hName] = filteredHobby;
        saveHobbies();

        successAlert.classList.remove("hidden");
        successAlert.innerHTML = `<p>Hobbyist Added Successfully!`;  
    }
    setTimeout(function(){
        clearField();
    },2000);
}

//Local Storage
function saveHobbies(){
    window.JSON.parse(localStorage.getItem('hobbyistsList') || "[]");
    window.localStorage.setItem("hobbyistsList", JSON.stringify(hobbyistArray));
}

//Clear Hobbies Input
function clearField(){
    personName.value = '';
    hobbyOne.value ='';
    hobbyTwo.value ='';
    hobbyThree.value ='';
    successAlert.classList.add("hidden");
    successAlert.innerHTML = '';
}

//Clear Hobbyists Search
clrBtn.addEventListener("click", function(){
    hobbystList.innerHTML = '<p>Please give Hobby as Input</p>';
    hobbyInput.value = '';
})

/* SAMPLE INPUT */
// var hobbies =
// {
// "Steve": ['Fashion', 'Piano', 'Reading'], 
// "Patty": ['Drama', 'Magic', 'Pets'], 
// "Chad": ['Puzzles', 'Pets'],
// "azhar": ["Yoga"],
// "md": ['Drama', 'Magic', 'Pets'],
// "mohamed": ['Drama', 'Magic', 'Pets'], 
// "azhu": ['Puzzles', 'Pets'],
// "pyar": ['Drama', 'Magic', 'Pets'],
// "zo":['Drama', 'Magic', 'Pets'],
// "ro":['Drama', 'Magic', 'Pets'],
// };