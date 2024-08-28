console.log("recipes: ", recipes);
const cardContainer = document.querySelector("#cardContainer");
if (cardContainer) {
  console.log("cardContainer", cardContainer);
  cardContainer.innerHTML = "";
  recipes.forEach(function (recipe) {
    const template = generateCard(recipe);
    cardContainer.insertAdjacentHTML("beforeend", template);
  });
}

const ingredients = recipes.flatMap(function (recipe) {
  return recipe.ingredients.map(function (i) {
    return i.ingredient;
  });
});

const cleanIngredients = [...new Set(ingredients)];

cleanIngredients.sort();

console.log("cleanIngredients", cleanIngredients);
const searchIngredient = cleanIngredients[0];
console.log("search ", searchIngredient);

function filterByIngredient(ingredientArray) {
  const results = recipes.filter(function (recipe) {
    let match = true;
    ingredientArray.forEach(function (ingredient) {
      const result = recipe.ingredients.find(function (i) {
        return i.ingredient === ingredient;
      });
      if (!result) {
        match = false;
      }
    });
    return match;
  });
  return results;
}
console.log(
  "test",
  filterByIngredient([searchIngredient, cleanIngredients[68]])
);
