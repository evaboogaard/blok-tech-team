console.log("waddup");

const homeButton = document.querySelector("nav ul li:nth-of-type(1)");
const likeButton = document.querySelector("nav ul li:nth-of-type(2)");
const accountButton = document.querySelector("nav ul li:nth-of-type(3)");

homeButton.addEventListener("click", () => {
    homeButton.classList.add("active");
    likeButton.classList.remove("active");
    accountButton.classList.remove("active");
})

likeButton.addEventListener("click", () => {
    homeButton.classList.remove("active");
    likeButton.classList.add("active");
    accountButton.classList.remove("active");
})

accountButton.addEventListener("click", () => {
    homeButton.classList.remove("active");
    likeButton.classList.remove("active");
    accountButton.classList.add("active");
})