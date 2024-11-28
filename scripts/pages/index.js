console.log("recipes: ", recipes);
const cardContainer = document.querySelector("#cardContainer");
const filterListFunction = {
  "ingredient-list": filterByIngredient,
  "appliance-list": filterByAppliance,
  "ustensil-list": filterByUstensil,
};
let selectedItems = [];
let currentRecipes = [];
currentRecipes = recipes;

displayRecipes(recipes);
let { ingredients, appliances, ustensils } = initDropdownData(recipes);

/*========================== Dropdown =============================*/
document.querySelectorAll(".dropdown__title").forEach((dropdown) => {
  const clickEventListener = (event) => {
    let dropdown = event.target;
    if (!event.target.classList.contains("dropdown__multiselect")) {
      dropdown = event.target.closest(".dropdown__multiselect");
    }
    dropdown.classList.toggle("show");
  };
  dropdown.removeEventListener("click", clickEventListener);
  dropdown.addEventListener("click", clickEventListener);
});
function updateDropdowns() {
  initDropdownIngredient(ingredients, selectedItems);
  initDropdownAppliance(appliances, selectedItems);
  initDropdownUstensil(ustensils, selectedItems);
  dropdownEvents();
}
function dropdownEvents() {
  document.querySelectorAll(".dropdown__multiselect").forEach((dropdown) => {
    let menuItems = dropdown.querySelectorAll(".dropdown__menu li");

    menuItems.forEach((li) => {
      li.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("menu click l159", event.target);
        let listItem = event.target;
        console.log("debug", listItem.closest("ul"), listItem);
        const listId = listItem.closest("ul").getAttribute("id");

        if (event.target.tagName !== "LI") {
          listItem = event.target.closest("li");
        }
        let item = listItem.textContent;
        if (!selectedItems.includes(item)) {
          selectedItems.push(item);
        } else {
          selectedItems = selectedItems.filter((value) => value !== item);
          // refaire une recherche
          // refaire une recherche sur le texte si te texte existe
          
        }

        /**
         * mise en place des tags
         */
        displayTags(selectedItems);

        const filteredRecipes = filterListFunction[listId](
          selectedItems,
          currentRecipes
        );
        currentRecipes = filteredRecipes;
        displayRecipes(filteredRecipes);
        updateDropdowns();
        //removeSelectedItem(listItem);
      });
    });
  });
}

updateDropdowns();
/*=========================== searchbar =========================== */
document.getElementById("search-bar").addEventListener("input", function (e) {
  e.preventDefault();
  console.log("e", e);
  const str = e.target.value;
  if (str.length < 3) {
    return;
  }
  console.log("recherche sur ", str);
  // Filtrer les recettes en fonction de l'entrée de l'utilisateur
  const filteredRecipes = recipes.filter((recipe) => {
    // Vérifier si le titre contient le texte de recherche
    const titleMatch = recipe.name.includes(str);

    // Vérifier si un ingredient contient le texte de recherche
    const ingredientMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.includes(str)
    );

    // Vérifier si un appareil contient le texte de recherche
    const applianceMatch = recipe.appliance.includes(str);

    // Vérifier si un ustensil contient le texte de recherche
    const ustensilMatch = recipe.ustensils.some((ustensil) =>
      ustensil.includes(str)
    );

    // Return true or false selon les critères
    return titleMatch || ingredientMatch || applianceMatch || ustensilMatch;
  });

  currentRecipes = filteredRecipes;
  const dropdownData = initDropdownData(filteredRecipes);
  ingredients = dropdownData.ingredients;
  appliances = dropdownData.appliances;
  ustensils = dropdownData.ustensils;
  updateDropdowns();
  displayRecipes(filteredRecipes);
});
