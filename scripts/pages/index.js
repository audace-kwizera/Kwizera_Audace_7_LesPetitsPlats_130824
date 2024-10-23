console.log("recipes: ", recipes);
const cardContainer = document.querySelector("#cardContainer");
const filterListFunction = {
  "ingredient-list": filterByIngredient,
  "appliance-list": filterByAppliance,
  "ustensil-list": filterByUstensil,
};
function displayRecipes(recipes) {
  if (cardContainer) {
    console.log("cardContainer", cardContainer);
    cardContainer.innerHTML = "";
    recipes.forEach(function (recipe) {
      const template = generateCard(recipe);
      cardContainer.insertAdjacentHTML("beforeend", template);
    });
  }
}
displayRecipes(recipes);

/*============================ FlatMap ===============================*/
// Flat Map pour appliquer fonction ingredients à chaque élément en mettant à plat
const ingredients = recipes.flatMap(function (recipe) {
  return recipe.ingredients.map(function (i) {
    return i.ingredient;
  });
});

const appliance = recipes.flatMap(function (i) {
  return i.appliance;
});

const ustensils = recipes.flatMap(function (recipe) {
  return recipe.ustensils;
});

/*============================ Set ===============================*/
// Elimination des doublons automatiquement grâce à set et mis dans un tableau pour créer un tableau
const cleanIngredients = [...new Set(ingredients)];
const cleanAppliance = [...new Set(appliance)];
const cleanUstensils = [...new Set(ustensils)];

/*============================ Sort ===============================*/
// Classement des éléments par ordre alphabetique avec sort
cleanIngredients.sort();
cleanAppliance.sort();
cleanUstensils.sort();

console.log("cleanAppliance ===> ", cleanAppliance);
console.log("cleanUstensils ==> ", cleanUstensils);
console.log("cleanIngredients", cleanIngredients);

/*============================ Search ===============================*/
// Function pour les recherches
const searchIngredient = cleanIngredients[0];
const searchAppliance = cleanAppliance[0];
const searchUstensil = cleanUstensils[4];
console.log("search ", searchIngredient, searchAppliance, searchUstensil);

/*========================== Filter =============================*/
// Function pour filtrer les ingredients
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
  console.log("filterByIngredient", ingredientArray, results);
  return results;
}

console.log(
  "Ingredients ====>",
  filterByIngredient([searchIngredient, cleanIngredients[68]])
);

// Function pour filtrer les Appareils
function filterByAppliance(applianceArray) {
  const results = recipes.filter(function (recipe) {
    return applianceArray.includes(recipe.appliance);
  });
  return results;
}

console.log(
  "Appareil ====>",
  filterByAppliance([searchAppliance, cleanAppliance[5]])
);

// Function pour filtrer les Ustensils
function filterByUstensil(ustensilArray) {
  const results = recipes.filter(function (recipe) {
    return ustensilArray.every(function (ustensil) {
      return recipe.ustensils.includes(ustensil);
    });
  });
  return results;
}

console.log(
  "Ustensiles ====>",
  filterByUstensil([searchUstensil, cleanUstensils[4]])
);

// Funtion pour la dropdown ingredient
function initDropdownIngredient() {
  const ulElement = document.getElementById("ingredient-list");
  ulElement.innerHTML = "";
  cleanIngredients.forEach(function (ingredient) {
    const liElement = document.createElement("li");
    liElement.textContent = ingredient;
    ulElement.append(liElement);
  });
}
initDropdownIngredient();

// Funtion pour la dropdown appareil
function initDropdownAppliance() {
  const ulElement = document.getElementById("appliance-list");
  ulElement.innerHTML = "";
  cleanAppliance.forEach(function (appliance) {
    const liElement = document.createElement("li");
    liElement.textContent = appliance;
    ulElement.append(liElement);
  });
}
initDropdownAppliance();

// Funtion pour la dropdown ustensil
function initDropdownUstensil() {
  const ulElement = document.getElementById("ustensil-list");
  ulElement.innerHTML = "";
  cleanUstensils.forEach(function (ustensil) {
    const liElement = document.createElement("li");
    liElement.textContent = ustensil;
    ulElement.append(liElement);
  });
}
initDropdownUstensil();

/*========================== Dropdown =============================*/
document.querySelectorAll(".dropdown__multiselect").forEach((dropdown) => {
  let menuItems = dropdown.querySelectorAll(".dropdown__menu li");
  let listContainer = dropdown.querySelector(
    ".dropdown__selectedList__container"
  );
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
      
      if (event.target.tagName !== 'LI') {
        listItem = event.target.closest('li');
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
      const recipes = filterListFunction[listId](selectedItems);
      displayRecipes(recipes);
    });
  });
});

function showSelectedItems(item) {
  let itemSpan = document.createElement("span");
  let crossIcon = document.createElement("i");

  item.classList.add("selectedItem");

  crossIcon.classList.add("fa-solid", "fa-xmark");
 

  itemSpan.appendChild(crossIcon);
  
  item.append(itemSpan);

  /**
   * ajouter un tag avec un identifiant
   */
}

function removeSelectedItem(li) {
  // supprimer la classe
  // supprimer le span
  li.classList.remove("selectedItem");
  li.innerHTML = li.textContent;
  /**
   * supprimer le tag
   */
}
