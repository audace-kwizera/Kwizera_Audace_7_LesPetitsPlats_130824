console.log("recipes: ", recipes);
const cardContainer = document.querySelector("#cardContainer");
if (cardContainer) {
  console.log("cardContainer", cardContainer);
  cardContainer.innerHTML = "";
  recipes.forEach(function (recipe) {
    const template = generateCard(recipe);
    cardContainer.insertAdjacentHTML('beforeend', template);
  });
}
