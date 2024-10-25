console.log("recipes: ", recipes);
const cardContainer = document.querySelector("#cardContainer");
const filterListFunction = {
  "ingredient-list": filterByIngredient,
  "appliance-list": filterByAppliance,
  "ustensil-list": filterByUstensil,
};

displayRecipes(recipes);
const { ingredients, appliances, ustensils } = initDropdownData(recipes);
initDropdownIngredient(ingredients);
initDropdownAppliance(appliances);
initDropdownUstensil(ustensils);
/*========================== Dropdown =============================*/
document.querySelectorAll(".dropdown__multiselect").forEach((dropdown) => {
  let menuItems = dropdown.querySelectorAll(".dropdown__menu li");
  let selectedItems = [];

  dropdown.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("dropdown__multiselect") ||
      event.target.classList.contains("dropdown__title") ||
      event.target.classList.contains("dropdown__title__label")
    ) {
      dropdown.classList.toggle("show");
    }
  });

  menuItems.forEach((li) => {
    li.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("menu click l159", event.target);
      let listItem = event.target;

      if (event.target.tagName !== "LI") {
        listItem = event.target.closest("li");
      }
      let item = listItem.textContent;

      if (!selectedItems.includes(item)) {
        selectedItems.push(item);
        showSelectedItems(listItem);
      } else {
        selectedItems = selectedItems.filter((value) => value !== item);
        removeSelectedItem(listItem);
      }
      const listId = listItem.closest("ul").getAttribute("id");
      const filteredRecipes = filterListFunction[listId](
        selectedItems,
        recipes
      );
      displayRecipes(filteredRecipes);
    });
  });
});
/*=========================== searchbar =========================== */
document.getElementById('search-bar').addEventListener('input', function (e) {
  e.preventDefault();
  console.log('e', e);
  const str = e.target.value;
  console.log('recherche sur ', str);
  // Filtrer les recettes en fonction de l'entrée de l'utilisateur
  const filterRecipes = recipes.filter(recipe => {
    // Vérifier si le titre contient le texte de recherche
    const titleMatch = recipe.name.includes(str);

    // Vérifier si un ingredient contient le texte de recherche
    const ingredientMatch = recipe.ingredients.some(ingredient =>
      ingredient.ingredient.includes(str)  
    );

    // Vérifier si un appareil contient le texte de recherche
    const applianceMatch = recipe.appliance.includes(str);

    // Vérifier si un ustensil contient le texte de recherche
    const ustensilMatch = recipe.ustensils.some(ustensil => 
      ustensil.includes(str)   
    );

    // Return true or false selon les critères
    return titleMatch || ingredientMatch || applianceMatch || ustensilMatch;
  });
  displayRecipes(filterRecipes);
})