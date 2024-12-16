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
        const findItem = selectedItems.find(
          (selectedItemObj) => item === selectedItemObj.item
        );
        // il ne peut que y avoir un seul filtre appliance...
        const findApplianceFilterIndex = selectedItems.findIndex(
          (selectedItem) => selectedItem.listId === "appliance-list"
        );
        if (
          findApplianceFilterIndex > -1 &&
          listId === "appliance-list" &&
          !findItem
        ) {
          selectedItems[findApplianceFilterIndex].item = item;
        } else if (!findItem) {
          selectedItems.push({ item, listId });
          const filteredRecipes = filterListFunction[listId](
            selectedItems,
            currentRecipes
          );
          currentRecipes = filteredRecipes;
          displayRecipes(filteredRecipes);
        } else {
          selectedItems = selectedItems.filter(
            (selectedItemObj) => selectedItemObj.item !== item
          );
          // refaire une recherche complète
          fullResearch();
        }

        /**
         * mise en place des tags
         */
        displayTags();

        updateDropdowns();
      });
    });
  });
}

function fullResearch(str) {
  let text = str || document.getElementById("search-bar").value;
  let prefilteredRecipes = recipes;
  if (text.length > 2) {
    prefilteredRecipes = researchByTxt(text);
  }
  const filteredRecipes = filterByIngredient(selectedItems, prefilteredRecipes);
  const filteredRecipes2 = filterByAppliance(selectedItems, filteredRecipes);
  const filteredRecipes3 = filterByUstensil(selectedItems, filteredRecipes2);
  displayRecipes(filteredRecipes3);
  currentRecipes = filteredRecipes3;
}

function researchByTxt(str) {
  let text = str.toLowerCase();
  // Filtrer les recettes en fonction de l'entrée de l'utilisateur
  const filteredRecipes = recipes.filter((recipe) => {
    // Vérifier si le titre contient le texte de recherche
    const titleMatch = recipe.name.toLowerCase().includes(text);

    // Vérifier si un ingredient contient le texte de recherche
    const ingredientMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(text)
    );

    // Vérifier si un appareil contient le texte de recherche
    const applianceMatch = recipe.appliance.includes(text);

    // Vérifier si un ustensil contient le texte de recherche
    const ustensilMatch = recipe.ustensils.some((ustensil) =>
      ustensil.toLowerCase().includes(str)
    );

    // Return true or false selon les critères
    return titleMatch || ingredientMatch || applianceMatch || ustensilMatch;
  });
  return filteredRecipes;
}
updateDropdowns();
/*=========================== searchbar =========================== */
document.getElementById("search-bar").addEventListener("input", function (e) {
  e.preventDefault();
  const str = e.target.value;
  if (str.length < 3) {
    return;
  }
  const filteredRecipes = researchByTxt(str);
  currentRecipes = filteredRecipes;
  const dropdownData = initDropdownData(filteredRecipes);
  ingredients = dropdownData.ingredients;
  appliances = dropdownData.appliances;
  ustensils = dropdownData.ustensils;
  updateDropdowns();
  displayRecipes(filteredRecipes);
});
