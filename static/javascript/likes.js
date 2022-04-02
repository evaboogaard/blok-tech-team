console.log(`epico momento de bruh`);

const allLikes = document.querySelectorAll(`.animate`);
// const restaurant = document.querySelector(`article`);

// restaurant.addEventListener("click", () =>{
//     restaurant.classList.toggle("unlike");
// })

// De Requirements om de class er uiteindelijk op te laten zetten:
// rootMargin -> vanaf 20px gaat JS checken
// treshold -> de hoeveelheid van het item dat in beeld moet zijn om getriggerd te worden
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