// const currentUser = {
//     id: 1,
//     name: "Cam",
//     username: "Cammy",
//     password: "abc123",
//     age: 21
// }

//********************** DOM selectors *************************
const wineCard = document.querySelector('#wine-card')
const wineDetail = document.querySelector('#wine-detail')
const sideCarousel = document.querySelector('#side-carousel')
const newWineForm = document.querySelector('#new-wine')
const favoriteWineList = document.querySelector('#favorites-list')
const occasionDropdown = document.querySelector('#occasion-dropdown')
const wineSpecifics = document.querySelector('#wine-specifics')
const wineImageDiv = document.querySelector('#wine-image')
const wineNameDiv = wineSpecifics.querySelector('#wine-name')
const varietalDiv = wineSpecifics.querySelector('#varietal')
const classificationDiv = wineSpecifics.querySelector('#classification')
const wineYear = wineSpecifics.querySelector('#year')
const favDiv = document.querySelector('#fav-button')



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

function postWineObj(newWineObj){
    fetch('http://localhost:3000/wines', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWineObj),
    })
    .then(response => response.json())
    .then((wine) => {
        renderNewWine(wine);
    })


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
    const name = document.createElement('h3')
    name.innerText = wineObj.name
    // classification
    const classification = document.createElement('h4')
    classification.innerText = `Classification: ${wineObj.classification}`
    // year
    const year = document.createElement('h4')
    year.innerText = `Vintage: ${wineObj.year}`
    //varietal
    const varietal = document.createElement('h4')
    varietal.innerText = `Varietal: ${wineObj.varietal}`
    // review
    const review = document.createElement('p')
    review.innerText = wineObj.review
    // image
    const img = document.createElement('img')
    img.classList.add('image-display')
    img.src = wineObj.image_url
    img.alt = wineObj.name
     // favorite button
    const favoriteButton = document.createElement('button')
    favoriteButton.innerHTML = "Favorite"

    // slap it on the dom
    // cam add-ons below
    wineImageDiv.append(img)
    wineNameDiv.append(name)
    varietalDiv.append(varietal)
    classificationDiv.append(classification)
    wineYear.append(year)
    favDiv.append(favoriteButton)




    favoriteButton.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/user_wine_favorites`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wine_id: wineObj.id,
                user_id: 1,
            })
        })
        .then(res => res.json())
        .then(renderNewFavorite)
    })
}

function renderNewWine(wine){
      // name
      const name = document.createElement('p')
      name.innerText = wine.name
      // classification
      const classification = document.createElement('p')
      classification.innerText = wine.classification
      // year
      const year = document.createElement('p')
      year.innerText = wine.year
      //varietal
      const varietal = document.createElement('p')
      varietal.innerText = wine.varietal
      // review
      const review = document.createElement('p')
      review.innerText = wine.review
      // image
      const img = document.createElement('img')
      img.src = wine.image_url
      img.alt = wine.name
      // slap it on the dom
      wineDetail.append(img, name, classification, year, varietal, review)
}



// still need to build out
function createNewWine(evt) {
    evt.preventDefault()

    console.log(evt.target.classification)

    const newWineObj = {
        name: evt.target.name.value,
        classification: evt.target.classification.value,
        year: evt.target.year.value,
        varietal: evt.target.varietal.value,
        review: evt.target.review.value,
        image_url: evt.target.image_url.value
    }
    console.log(newWineObj)

    postWineObj(newWineObj)

}

function renderWineLi(wine) {
    const wineFavoriteLi = document.createElement('li')
    const deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"

    wineFavoriteLi.dataset.id = wine.id
    wineFavoriteLi.innerText = wine.name
    wineFavoriteLi.name = wine.name

    wineFavoriteLi.append(deleteButton)
    favoriteWineList.append(wineFavoriteLi)

    // ---------> Where we left off <----------
    deleteButton.addEventListener('click', (event) => {

        fetch(`http://localhost:3000/users/1`)
        .then(res => res.json())
        .then(console.log)

    })
}

fetch('http://localhost:3000/user_wine_favorites')
.then(res => res.json())
.then((favoriteArray) => {
    favoriteArray.forEach((favorite) => {
        let favoriteLi = document.createElement('li')
        favoriteLi.innerText = favorite.wine.name
        let deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"
        favoriteLi.append(deleteButton)
        favoriteWineList.append(favoriteLi)
    })
})

function renderNewFavorite(wine){
    let favLi = document.createElement('li')
    favLi.innerText = wine.wine.name
    favoriteWineList.append(favLi)
    console.log(favLi)
    slapDeleteButtonOnLi(favLi)
}

function slapDeleteButtonOnLi(favLi){
    let deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerText = "Delete"
    favLi.append(deleteButton)

    deleteButton.addEventListener('click', function(e){
        console.log(e.target)
    })
}

function selectOccasion(occasions) {
    //The filter() method creates a new array with all elements that pass the test implemented by the provided function (callback func).
    renderAllWines(occasions.filter(console.log));
  }

function addOccasionSelectListener() {
    let occasionDropdown = document.querySelector('#occasion-dropdown');
    occasionDropdown.addEventListener('change', function (event) {
        selectOccasion(event.target.value);
    });
}


fetch(`http://localhost:3000/wines/1`)
.then(res => res.json())
.then((wine) => {
  renderInitialWine(wine)
})

function renderInitialWine(wine){
    console.log(wine)
    const name = document.createElement('h3')
    name.innerText = wine.name
    // classification
    const classification = document.createElement('h4')
    classification.innerText = `Classification: ${wine.classification}`
    // year
    const year = document.createElement('h4')
    year.innerText = `Vintage: ${wine.year}`
    //varietal
    const varietal = document.createElement('h4')
    varietal.innerText = `Varietal: ${wine.varietal}`
    // review
    const review = document.createElement('p')
    review.innerText = wine.review
    // image
    const img = document.createElement('img')
    img.classList.add('image-display')
    img.src = wine.image_url
    img.alt = wine.name
     // favorite button
    const favoriteButton = document.createElement('button')
    favoriteButton.innerHTML = "Favorite"

    // slap it on the dom
    // cam add-ons below
    wineImageDiv.append(img)
    wineNameDiv.append(name)
    varietalDiv.append(varietal)
    classificationDiv.append(classification)
    wineYear.append(year)
    favDiv.append(favoriteButton)
}