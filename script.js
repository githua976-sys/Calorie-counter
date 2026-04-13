/* =========================
   1. DOM ELEMENTS (TOP)
========================= */
const form = document.getElementById("food-form");
const foodNameInput = document.getElementById("food-name");
const foodList = document.getElementById("food-list");
const totalDisplay = document.getElementById("total");
const resetBtn = document.getElementById("reset");


/* =========================
   2. DATA STORAGE
========================= */
let foods = JSON.parse(localStorage.getItem("foods")) || [];


/* =========================
   3. API FUNCTION (FETCH FAT)
========================= */
async function getNutrition(food) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/nutrition?query=${food}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "YOUR_API_KEY_HERE"
        }
      }
    );

    const data = await response.json();

    console.log(data); // check API response in console

    return data[0].fat_total_g; // ONLY FAT

  } catch (error) {
    console.error("Error fetching nutrition:", error);
    return 0;
  }
}


/* =========================
   4. RENDER FUNCTION (UI UPDATE)
========================= */
function renderFoods() {
  foodList.innerHTML = "";

  let totalFat = 0;

  foods.forEach((food, index) => {
    totalFat += food.fat;

    const li = document.createElement("li");
    li.className = "flex justify-between bg-gray-200 p-2 mb-2 rounded";

    li.innerHTML = `
      ${food.name} - ${food.fat} g fat
      <button onclick="deleteFood(${index})" class="text-red-500">X</button>
    `;

    foodList.appendChild(li);
  });

  totalDisplay.textContent = totalFat + " g";

  // SAVE TO LOCALSTORAGE
  localStorage.setItem("foods", JSON.stringify(foods));
}


/* =========================
   5. ADD FOOD (FORM SUBMIT)
========================= */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = foodNameInput.value.trim();

  if (!name) return;

  const fat = await getNutrition(name);

  foods.push({
    name: name,
    fat: fat
  });

  foodNameInput.value = "";

  renderFoods();
});


/* =========================
   6. DELETE FOOD
========================= */
function deleteFood(index) {
  foods.splice(index, 1);
  renderFoods();
}


/* =========================
   7. RESET BUTTON
========================= */
resetBtn.addEventListener("click", () => {
  foods = [];
  renderFoods();
});


/* =========================
   8. INITIAL LOAD
========================= */
renderFoods();
  
