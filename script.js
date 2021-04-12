const   search = document.getElementById('search');
const   submit = document.getElementById('submit');
const   random = document.getElementById('random');
const   mealsEl = document.getElementById('meals');
const   resultHeading = document.getElementById('result-heading');
const   single_mealEl = document.getElementById('single-meal');


// search meal & fetch
function  searchMeal(event) {
    event.preventDefault();
    


//clear single meal 
single_mealEl.innerHTML ='';

// get search term
    const term = search.value;

    //check is empty
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(response => response.json())
        .then(data => { 

            // i can do it moreover adjust this fuctionality as innsert adjacebtHTML
            // resultHeading.innerHTML ='';
            // resultHeading.insertAdjacentHTML('beforeend', blokh2(term));
            resultHeading.innerHTML = `<h2>Search result for '${term}':</h2>`

            if(data.meals === null) {
                // first adjacentHTML
                resultHeading.innerHTML = `<p>There are no search result .Try again!</p>`;
            } //second adjacentHTML 
            else {
            mealsEl.innerHTML = data.meals.map(meal => 
                `<div class ="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class = "meal-info" data-mealID="${meal.idMeal}    ">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`)
                .join('');
            }
        }) 
        // clear 
        search.value = "";
    }else {
        alert('please enter a search term');
    }


    function blokh2(query) {
        return `<h2>Search result for '${query}':</h2>`
    }
}
//featch meal by id

function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(breakfast => {
        const meal = breakfast.meals[0];

        addMealToDOM(meal);
    })
}

// add to mainpage

function addMealToDOM(meal) {
    const ingredients = [];
    console.log(meal)

    for(let i=1; i<=20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    single_mealEl.innerHTML = 
    `<div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(
                    component => `<li>${component}</li>`).join('')}
            </ul>
        </div>
        
    </div>`
}
// event listeners 

submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', event => {
    const mealInfo = event.composedPath().find(item => {
        console.log(item)
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false
        }
    })
    if(mealInfo) {
        console.log(mealInfo)
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
})