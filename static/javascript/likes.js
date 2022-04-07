const allLikes = document.querySelectorAll(`.animate`);

const options = {
    rootMargin: `20px`,
    treshold: 0.5
}

function callbackFunction(entries) {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0){
            entry.target.classList.add(`fade`);
        }
    })
}

const observer = new IntersectionObserver(callbackFunction, options);

// over alle elementen heenlopen
allLikes.forEach(item => {
    // het element observeren
    observer.observe(item);
})

let openFilter = document.querySelector('#head img');
let filter = document.querySelector('#filter');
let backButton = document.querySelector('#filter img');

openFilter.addEventListener('click', ()=>{
  filter.classList.toggle('show');
  filter.style.transition = "all 1s";
});

backButton.addEventListener('click', ()=>{
  filter.classList.toggle('show');
  filter.style.transition = "all 1s";
});