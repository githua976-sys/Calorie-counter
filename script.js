const form = document.getElementById("food-form");
const foodName = document.getElementById("food-name");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("food-list");
const totalDisplay = document.getElementById("total");
const resetBtn = document.getElementById("reset");

let foods = JSON.parse(localStorage.getItem("foods")) || [];

// 🟢 Render foods
function renderFoods() {
  foodList.innerHTML = "";
  let total = 0;

  foods.forEach((food, index) => {
    total += food.calories;

    const li = document.createElement("li");
    li.className = "flex justify-between bg-gray-200 p-2 mb-2 rounded";

    li.innerHTML = `
      ${food.name} - ${food.calories} cal
      <button onclick="deleteFood(${index})" class="text-red-500">X</button>
    `;

    foodList.appendChild(li);
  });

  totalDisplay.textContent = total;

  localStorage.setItem("foods", JSON.stringify(foods));
}

// 🟢 Add food
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = foodName.value.trim();
  const calories = Number(caloriesInput.value);

  if (!name || !calories) return;

  foods.push({ name, calories });

  foodName.value = "";
  caloriesInput.value = "";

  renderFoods();
});

// 🔴 Delete food
function deleteFood(index) {
  foods.splice(index, 1);
  renderFoods();
}

// 🔄 Reset
resetBtn.addEventListener("click", () => {
  foods = [];
  renderFoods();
});

// 🚀 Initial load
renderFoods();