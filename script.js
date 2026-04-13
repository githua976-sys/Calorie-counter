// 1. SELECT DOM ELEMENTS
const form = document.getElementById("food-form");
const foodName = document.getElementById("food-name");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("food-list");
const totalDisplay = document.getElementById("total");

// 2. GLOBAL VARIABLES
let foods = JSON.parse(localStorage.getItem("foods")) || [];

// 3. FETCH API FUNCTION  - SIMULATING CALORIE FETCHING
async function getNutrition(food) {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${food}`,
    {
        method: "GET",
        headers: {
          "X-Api-Key":"xayGaWWNgDF76bib3xFgvcFPlbPg77I2nLvE5smB",
          'content-Type': "application/json",
        }
      }
      
    )};
// 4. RENDER FUNCTION
function renderFoods() {
  foodList.innerHTML = "";
  let total = 0;

  foods.forEach((food, index) => {
    total += food.calories;

    const li = document.createElement("li");
    li.innerHTML = `
      ${food.name} - ${food.calories}
      <button onclick="deleteFood(${index})">X</button>
    `;

    foodList.appendChild(li);
  });

  totalDisplay.textContent = total;

  localStorage.setItem("foods", JSON.stringify(foods));
}

// 5. ADD FOOD (EVENT LISTENER)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = foodName.value.trim();

  // 🔥 USING FETCH API HERE
  const calories = await fetchCalories(name);

  foods.push({ name, calories });

  renderFoods();
  form.reset();
});

// 6. DELETE FUNCTION
function deleteFood(index) {
  foods.splice(index, 1);
  renderFoods();
}

// 7. INITIAL LOAD
renderFoods();
  
