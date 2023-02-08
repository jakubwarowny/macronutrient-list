const btnSearch = document.querySelector(`.btnSearch`)
const btnImport = document.querySelector(`.btnImport`)

const foods = []
const searchResultObject = {}

let sumCalories = 0
let sumCarbohydrates = 0
let sumFat = 0
let sumProtein = 0
let sumPotassium = 0
let sumCholesterol = 0
let sumSodium = 0
let sumSugar = 0
let sumFiber = 0

const addNewFood = (newFoodContent) => {
    foods.push({
        foodName: newFoodContent
    });

    summary();
    render();
};


const summary = () => {
    sumCalories += searchResultObject.calories
    sumCarbohydrates += searchResultObject.carbohydrates
    sumFat += searchResultObject.fat
    sumProtein += searchResultObject.protein
    sumPotassium += searchResultObject.potassium
    sumCholesterol += searchResultObject.cholesterol
    sumSodium += searchResultObject.sodium
    sumSugar += searchResultObject.sugar
    sumFiber += searchResultObject.fiber
}

const render = () => {

    
    htmlString = ``;

    for (const food of foods) {
        htmlString += `<div id="foodListDiv" style="margin-top:20px">${food.foodName}</div>`;
    };
    document.querySelector(`.foodList`).innerHTML = htmlString

    document.querySelector(`.summaryCalories`).textContent = `Calories: ${sumCalories.toFixed(2)}kcal`
    document.querySelector(`.summaryCarbo`).textContent = `Carbohydrates: ${sumCarbohydrates.toFixed(2)}g`
    document.querySelector(`.summaryFat`).textContent = `Fat: ${sumFat.toFixed(2)}g`
    document.querySelector(`.summaryCholesterol`).textContent = `Protein: ${sumProtein.toFixed(2)}g`
    document.querySelector(`.summaryProtein`).textContent = `Potassium: ${sumPotassium.toFixed(2)}g`
    document.querySelector(`.summaryPotassium`).textContent = `Cholestereol: ${sumCholesterol.toFixed(2)}g`
    document.querySelector(`.summarySodium`).textContent = `Sodium: ${sumSodium.toFixed(2)}g`
    document.querySelector(`.summarySugar`).textContent = `Sugar: ${sumSugar.toFixed(2)}g`
    document.querySelector(`.summaryFiber`).textContent = `Fiber: ${sumFiber.toFixed(2)}g`

}

const onFormSubmit = (event) => {
    event.preventDefault();
    
    document.querySelector(`.summaryDiv`).style.display = `flex`

    const newFoodContent =
        `
    <p>${searchResultObject.nameFood}</p>
    <p>${searchResultObject.serving}g</p>
    <p>${searchResultObject.calories} kcal</p>
    <p>${searchResultObject.carbohydrates}g</p>
    <p>${searchResultObject.fat}g</p>
    <p>${searchResultObject.cholesterol}g</p>
    <p>${searchResultObject.protein}g</p>
    <p>${searchResultObject.potassium}g</p>
    <p>${searchResultObject.sodium}g</p>
    <p>${searchResultObject.sugar}g</p>
    <p>${searchResultObject.fiber}g</p>
    `
    if (newFoodContent === ``) {
        return;
    }
    addNewFood(newFoodContent)
}

const init = () => {
    render()
    document.querySelector(`.form`).addEventListener(`submit`, onFormSubmit)
}
init()

const refreshBtn = () => {
    btnImport.style.display = `flex`
    document.querySelector(`.inputSearch`).value = ` `
    console.log(searchResultObject)
}

const showMacroFood = (event) => {
    event.preventDefault();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '09685b6031mshe4fc9f7b1a82963p150f43jsn7fc6677065e8',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    };

    fetch('https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + document.querySelector(`.inputSearch`).value, options)
        .then(response => response.json())
        .then(response => {
            console.log(response[0])

            searchResultObject.nameFood = response[0].name
            searchResultObject.serving = response[0].serving_size_g
            searchResultObject.calories = response[0].calories
            searchResultObject.carbohydrates = response[0].carbohydrates_total_g
            searchResultObject.fat = response[0].fat_total_g
            searchResultObject.protein = response[0].protein_g
            searchResultObject.potassium = response[0].potassium_mg
            searchResultObject.cholesterol = response[0].cholesterol_mg
            searchResultObject.sodium = response[0].sodium_mg
            searchResultObject.sugar = response[0].sugar_g
            searchResultObject.fiber = response[0].fiber_g

            document.querySelector(`.foodName`).textContent = `name: ${searchResultObject.nameFood}`
            document.querySelector(`.serving`).textContent = `serving: ${searchResultObject.serving}`
            document.querySelector(`.kcal`).textContent = `calories: ${searchResultObject.calories}g`
            document.querySelector(`.carbo`).textContent = `carbohydrates: ${searchResultObject.carbohydrates}g`
            document.querySelector(`.fat`).textContent = `fat: ${searchResultObject.fat}g`
            document.querySelector(`.protein`).textContent = `protein: ${searchResultObject.protein}g`
            document.querySelector(`.potassium`).textContent = ` potassium: ${searchResultObject.potassium}g`
            document.querySelector(`.cholesterol`).textContent = `cholesterol: ${searchResultObject.cholesterol}g`
            document.querySelector(`.sodium`).textContent = `sodium: ${searchResultObject.sodium}g`
            document.querySelector(`.sugar`).textContent = `sugar: ${searchResultObject.sugar}g`
            document.querySelector(`.fiber`).textContent = `fiber: ${searchResultObject.fiber}g`

            refreshBtn();
        })
        .catch(err => console.error(err));
}

document.querySelector(`.form1`).addEventListener(`submit`, showMacroFood)

