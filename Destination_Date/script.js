const deptSelect = document.querySelector(".dept-select");
const destSelect = document.querySelector(".dest-select");
const bottomContainer = document.querySelector(".container-bottom ")
const resultBox = document.querySelector(".result-container");
const dateSelect = document.querySelector(".date");
const clrBtn = document.querySelector(".clear");

//Objects
var departures = ["Madurai","Tirunelveli","Trichy","Coimbatore","Salem","Chennai","Bangalore"];
var destinations = ["Madurai","Trichy","Coimbatore","Salem","Chennai","Bangalore","Mumbai"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const routeMap = {
    "Madurai" : { "Trichy":2,"Coimbatore":3,"Salem":3},
    "Tirunelveli" : {"Madurai":2},
    "Trichy" : {"Chennai":3},
    "Coimbatore" : {"Chennai":3, "Bangalore":3},
    "Salem" : {"Bangalore":2},
    "Chennai" : {"Bangalore":2, "Mumbai":5},
    "Bangalore" : {"Mumbai":3}
}
var dep = '';
var dest = '';
var tempData = [];
var finalArray = [];
var reqDate = '';

//Create Drop-down select box
function dropDown(){
    departures = departures.sort();
    destinations = destinations.sort();
    deptSelect.innerHTML = '<option value="From" selected>From</option>';;
    destSelect.innerHTML = '<option value="To" selected>To</option>';;
    departures.forEach((departure) => {
        deptSelect.innerHTML += `<option value=${departure}>${departure}</option>`;
    });
    destinations.forEach((destination) => {
        destSelect.innerHTML += `<option value=${destination}>${destination}</option>`;
    });

}
dropDown();

//Departure Select-Box
deptSelect.addEventListener("change", function(){
    dep = this.value;
    console.log(dep);
});

//Destination Select-Box
destSelect.addEventListener("change", function(){
    dest = this.value;
    console.log(dest);
})

//FUNC - If Destination as Child
function getTempDest(){
    var dateEntered = new Date(dateSelect.value);
    if (dateEntered.setHours(0,0,0,)>new Date().setHours(0,0,0,0)){
        if(routeMap.hasOwnProperty(dep)){
            console.log(routeMap[dep])
            if(routeMap[dep].hasOwnProperty(dest)){
                route = `${dep} -> ${dest}`;
                days = `${routeMap[dep][dest]}`;
                const container = {
                    route: route,
                    days: days 
                }
                finalArray.push(container)
            }else{
                for(var place in routeMap[dep]){
                    getTempDatas(place);
                }
            }
            getDirection(dateEntered);
        }else if(dep==="" && dest ===""){
            alert("Oops! I think you forgot to choose Departure or Destination!");
        }else{
            console.log(dep,dest)
            alert("Sorry! Route Not Found!");
            clearData();
        }        
    }else{
        alert("Please fill valid Date!");
        clearData();
    }
}

//FUNC - If Destination is child for Other Parent
function getTempDatas(place){
    if(routeMap.hasOwnProperty(place)){
        if(routeMap[place].hasOwnProperty(dest)){
            route = `${dep} -> ${place} -> ${dest}`;
            days = `${routeMap[dep][place]+routeMap[place][dest]}`;
            console.log(route +"=>"+days)
            const container = {
                route: route,
                days: days 
            }
            finalArray.push(container)
        }else{
            for(var temp in routeMap[place]){
                // console.log(temp)
                if(temp !== dep && !tempData.includes(temp)){
                    route = `${dep} -> ${place} -> ${temp} -> ${dest}`;
                    days = `${routeMap[dep][place]+routeMap[place][temp]+routeMap[temp][dest]}`;
                    console.log(route +"=>"+days)
                    if(days !== null && days!== 'NaN' && days!==''){
                        const container = {
                            route: route,
                            days: days,    
                        }
                        finalArray.push(container)
                    }
                    tempData.push(temp);
                }
            }
        }
    }
}

//FUNC-Final Result
function getDirection(dateEntered){
    console.log(finalArray)
    if(finalArray.length===0){
        alert("Sorry! Route not found!");
        clearData();
    }else{
        var len = finalArray.length;
        var min = parseInt(finalArray[0].days);
        for(let i=1; i<len; i++){
            if(parseInt(finalArray[i].days) < min){
                min = finalArray[i].days;
            }
        }
        // console.log(min)
        for(var list in finalArray){
            if(finalArray.hasOwnProperty(list)){
                console.log(finalArray[list].days)
                if(finalArray[list].days === min){
                    reqDate = new Date(dateEntered.getTime() + min*24*60*60*1000);
                    console.log(finalArray[list].route)
                    bottomContainer.classList.remove("hidden");
                    resultBox.innerHTML = `
                    <p>${finalArray[list].route}</p>
                    <p>Totally ${finalArray[list].days} Days</p>
                    <p>Start ${dateEntered.getDate()}th ${month[dateEntered.getMonth()]} -> Arrive on ${reqDate.getDate()}th ${month[reqDate.getMonth()]}</p>
                    `;
                }
            }
        }
    }
}

clrBtn.addEventListener("click",function(){
    clearData();
});

function clearData(){
    resultBox.innerHTML = '';
    dateSelect.value = '';
    bottomContainer.classList.add("hidden");
    destSelect.innerHTML = '';
    deptSelect.innerHTML = '';
    dropDown();
}