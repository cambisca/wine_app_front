const currentUser = {
    id: 1,
    name: "Dr. Hernandez",
    username: "doc",
    password: "abc123",
    age: 21,
    varietal: "Barbera"
}

//********************** DOM selectors *************************
const wineCard = document.querySelector('#wine-card')
const wineDetail = document.querySelector('#wine-detail')
const sideCarousel = document.querySelector('#side-carousel')
const newWineForm = document.querySelector('.new-wine-form')
const favoriteWineList = document.querySelector('#favorites')
const occasionDropdown = document.querySelector('#occasion-dropdown')
const wineSpecifics = document.querySelector('#wine-specifics')
const wineImageDiv = document.querySelector('#wine-image')
const wineNameDiv = wineSpecifics.querySelector('#wine-name')
const varietalDiv = wineSpecifics.querySelector('#varietal')
const classificationDiv = wineSpecifics.querySelector('#classification')
const wineYear = wineSpecifics.querySelector('#year')
const favDiv = document.querySelector('#fav-button')
const varietalForm = document.querySelector('#varietal-form')
const foodPairings = document.querySelector('#food-pairings')




getAllWines()


//************************* Fetch *************************
function getAllWines(selectedVibe) {
    fetch(`http://localhost:3000/wines?vibe=${selectedVibe}`)
    .then(res => res.json())
    .then(renderAllWines)
}

function renderAllWines(wineArr) {
    let imgCarousel = document.querySelector('#side-carousel')
    imgCarousel.innerHTML = ""
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
    let imgCarousel = document.querySelector('#side-carousel')
    let img = document.createElement('img')
    img.src = wine.image_url
    img.alt = wine.name
    img.dataset.id = wine.id
    imgCarousel.append(img)
}

function displayWineDetail(wineObj) {

    wineImageDiv.innerHTML = ""
    wineNameDiv.innerHTML = ""
    varietalDiv.innerHTML = ""
    classificationDiv.innerHTML = ""
    wineYear.innerHTML = ""
    favDiv.innerHTML = ""


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
    favoriteButton.innerHTML = "❤️"


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
                user_id: 1
            })
        })
        .then(res => res.json())
        .then((favorite) => {
            renderNewFavorite(favorite)
        })
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

    const newWineObj = {
        name: evt.target.name.value,
        classification: evt.target.classification.value,
        year: evt.target.year.value,
        varietal: evt.target.varietal.value,
        review: evt.target.review.value,
        image_url: evt.target.image_url.value
    }

    postWineObj(newWineObj)

}

function renderWineLi(wine) {
    const wineFavoriteLi = document.createElement('li')


    wineFavoriteLi.dataset.id = wine.id
    wineFavoriteLi.innerText = wine.name
    wineFavoriteLi.name = wine.name


    wineFavoriteLi.append(deleteButton)
    favoriteWineList.append(wineFavoriteLi)

    slapDeleteButtonOnLi(wine)

    // deleteButton.addEventListener('click', (e) => {
    //     fetch(`http://localhost:3000/user_wine_favorites/${wineFavoriteLi.dataset.id}`, {
    //         method: 'DELETE'
    //     })
    //     .then(res => res.json())
    //     .then(e.target.closest('li').remove())
    // })
}

fetch('http://localhost:3000/user_wine_favorites')
.then(res => res.json())
.then((favoriteArray) => {
    favoriteArray.forEach((favorite) => {
        let favoriteLi = document.createElement('li')
        favoriteLi.innerText = favorite.wine.name
        favoriteLi.dataset.id = favorite.id
        // let deleteButton = document.createElement('button')
        // deleteButton.innerText = "Delete"
        // favoriteLi.append(deleteButton)
        slapDeleteButtonOnLi(favoriteLi)
        favoriteWineList.append(favoriteLi)
    })
})

function renderNewFavorite(wine){
    let favLi = document.createElement('li')
    favLi.innerText = wine.wine.name
    favoriteWineList.append(favLi)
    favLi.dataset.id = wine.id
    slapDeleteButtonOnLi(favLi)
}

function slapDeleteButtonOnLi(favLi){

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerText = "☠"
    favLi.append(deleteButton)


    deleteButton.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/user_wine_favorites/${favLi.dataset.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(e.target.closest('li').remove())
    })
}



function addOccasionSelectListener() {
    let occasionDropdown = document.querySelector('#occasion-dropdown');
    occasionDropdown.addEventListener('change', function (event) {
        getAllWines(event.target.value)

        // fetch(`http://localhost:3000/wines/vibe/${event.target.value}`)
        // .then(res => res.json())
        // .then(('line 245', console.log))

        // backend -> create custom route to handle above request
        // controller action should filter the wines based on that param
        // Wine.where(vibe: params[:vibe])
    });
}

addOccasionSelectListener()

fetch(`http://localhost:3000/wines/1`)
.then(res => res.json())
.then((wine) => {
    displayWineDetail(wine)
})


function renderFirstUser() {
    fetch(`http://localhost:3000/users/1`)
    .then(res => res.json())
    .then((user) => {
        changeVarietal(user)
    })
}

renderFirstUser()

function changeVarietal(userObj) {

    let varietalName = document.createElement('p')
    let varietalTitle = document.querySelector('#varietal-title')
    varietalTitle.append(varietalName)

    varietalForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let newPreference = e.target.varietal.value
        fetch(`http://localhost:3000/users/1`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                varietal: newPreference
            })
        })
        .then(res => res.json())
        .then((updatedUserObj) => {
            // Slap on the DOM
            varietalName.innerText = updatedUserObj.varietal
            // Save in memory
            userObj.varietal = updatedUserObj.varietal
        })
    })
}


changeVarietal()




