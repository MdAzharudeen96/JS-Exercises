const stars = document.querySelectorAll(".star");
const starRating = document.querySelector("#star-rating");
const numRating = document.querySelector(".rating");

starRating.addEventListener("click", (e) => {
    stars.forEach((star) => {
        star.classList.remove("checked");
    });
    const i = [...stars].indexOf(e.target);
    console.log(i);
    if(i>=0){
        stars[i].classList.add("checked");
        numRating.textContent = `Rating : ${stars.length - i}/5`;
    }else{
        numRating.textContent = `Raging : 0/5`;
    }
});
