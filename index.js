//********************** DOM selectors *************************
const wineCard = document.querySelector('#wine-card')
const wineDetail = document.querySelector('#wine-detail')
const sideCarousel = document.querySelector('#side-carousel')
const newWineForm = document.querySelector('#new-wine')

getAllWines()


//************************* Fetch *************************
function getAllWines(){
    fetch("http://localhost:3000/wines")
    .then(res => res.json())
    .then(renderAllWines)
}

function renderAllWines(wineArr) {
    wineArr.forEach(wine => {
        createWine(wine)
    })
}

function getSingleWine(id){
    fetch(`http://localhost:3000/wines/${id}`)
    .then(res => res.json())
    .then(displayWineDetail)
}

// ********************* Event Listeners **************************
sideCarousel.addEventListener('click', evt => {
    if (evt.target.matches("img")){
        getSingleWine(evt.target.dataset.id)
    }
})

newWineForm.addEventListener('submit', createNewWine)

// ******************* DOM Manipulation ********************
function createWine(wine) {
    const img = document.createElement('img')
    img.src = wine.image_url
    img.alt = wine.name
    img.dataset.id = wine.id 
    document.querySelector('#side-carousel').append(img)
}

function displayWineDetail(wineObj) {
    // name
    const name = document.createElement('p')
    name.innerText = wineObj.name
    // classification
    const classification = document.createElement('p')
    classification.innerText = wineObj.classification
    // year
    const year = document.createElement('p')
    year.innerText = wineObj.year 
    //varietal
    const varietal = document.createElement('p')
    varietal.innerText = wineObj.varietal
    // review
    const review = document.createElement('p')
    review.innerText = wineObj.review
    // image
    const img = document.createElement('img')
    img.src = wineObj.image_url
    img.alt = wineObj.name
    // slap it on the dom
    wineDetail.append(img, name, classification, year, varietal, review)
   
}




// still need to build out 
function createNewWine(evt) {
    evt.preventDefault()
    console.log(evt.target)

}

// function deleteFavorite() {

// }

// function updateOccasion() {
    // occasionDropdown.addEventListener('click', (e) => {

    // })
// }