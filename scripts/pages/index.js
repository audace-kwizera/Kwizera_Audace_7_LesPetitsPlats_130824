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

/*========================== Dropdown =============================*/
let dropdown = document.querySelector(".dropdown__multiselect");
let menu = document.querySelector(".dropdown__menu");
let listContainer = document.querySelector(".dropdown__selectedList__container");

let selectedItems = [];

dropdown.onclick = (event) => {
  if (event.target.classList.contains("dropdown__multiselect") || event.target.classList.contains("dropdown__arrow")) {
    dropdown.classList.toggle("show");
  }
};

menu.addEventListener("click", (event) => {
  event.preventDefault();
  let target = event.target;
  let li = target.closest("li");
  if (li) {
    let checkbox = li.querySelector("input[type='checkbox']");
    let item = checkbox.value;

    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
      if (!selectedItems.includes(item)) {
        selectedItems.push(item);
        showSelectedItems(item);
      }
    } else {
      selectedItems = selectedItems.filter((value) => value !== item);
      removeSelectedItem(item);
    }
  }
});

function showSelectedItems(item) {
  let itemSpan = document.createElement("span");
  let crossIcon = document.createElement("i");

  itemSpan.innerHTML = item;
  itemSpan.classList.add("selectedItem");

  crossIcon.classList.add("fa-solid", "fa-xmark");
  crossIcon.onclick = deleteItem;

  itemSpan.appendChild(crossIcon);
  listContainer.appendChild(itemSpan);
}

function removeSelectedItem(item) {
  let itemSpans = listContainer.getElementsByClassName("selectedItem");
  for (let i = 0; i < itemSpans.length; i++) {
    if (itemSpans[i].textContent.replace('×', '').trim() === item) {
      itemSpans[i].remove();
      break;
    }
  }
}

function deleteItem(event) {
  event.stopPropagation();
  let itemSpan = event.currentTarget.parentElement;
  let item = itemSpan.textContent.replace('×', '').trim();

  selectedItems = selectedItems.filter((value) => value !== item);

  itemSpan.classList.add("zoomOut");

  setTimeout(() => {
    itemSpan.remove();
    itemSpan.classList.remove("zoomOut");
  }, 390);

  // Décocher la case correspondante
  let checkbox = menu.querySelector(`input[value="${item}"]`);
  if (checkbox) {
    checkbox.checked = false;
  }
}
