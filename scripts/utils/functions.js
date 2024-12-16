function removeSelectedItem(li) {
  // supprimer la classe
  // supprimer le span
  li.classList.remove("selectedItem");
  li.innerHTML = li.textContent;
  /**
   * supprimer le tag
   */
}

function showSelectedItems(item) {
  let itemSpan = document.createElement("span");
  let crossIcon = document.createElement("i");

  item.classList.add("selectedItem");

  crossIcon.classList.add("fa-solid", "fa-xmark");

  itemSpan.appendChild(crossIcon);

  item.append(itemSpan);

  //const firstLi = item.closest("ul").querySelector("li.first");
  //firstLi.before(item);

  /**
   * ajouter un tag avec un identifiant
   */
}
function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
function initDropdownData(recipes) {
  /*============================ FlatMap ===============================*/
  // Flat Map pour appliquer fonction ingredients à chaque élément en mettant à plat
  const ingredients = recipes.flatMap(function (recipe) {
    return recipe.ingredients.map(function (i) {
      const { ingredient } = i;

      return capitalizeFirstLetter(ingredient);
    });
  });

  const appliance = recipes.flatMap(function (i) {
    return capitalizeFirstLetter(i.appliance);
  });

  const ustensils = recipes.flatMap(function (recipe) {
    if (recipe.ustensils) {
      return recipe.ustensils.flatMap((ustensil) =>
        capitalizeFirstLetter(ustensil)
      );
    }
    return "";
  });

  /*============================ Set ===============================*/
  // Elimination des doublons automatiquement grâce à set et mis dans un tableau pour créer un tableau
  const cleanIngredients = [...new Set(ingredients)];
  const cleanAppliance = [...new Set(appliance)];
  const cleanUstensils = [...new Set(ustensils)];

  /*============================ Sort ===============================*/
  // Classement des éléments par ordre alphabetique avec sort
  cleanIngredients.sort((a, b) => a.localeCompare(b));
  cleanAppliance.sort((a, b) => a.localeCompare(b));
  cleanUstensils.sort((a, b) => a.localeCompare(b));


  return {
    ingredients: cleanIngredients,
    appliances: cleanAppliance,
    ustensils: cleanUstensils,
  };
}

/*============================ Search ===============================*/
// Function pour les recherches

/*========================== Filter =============================*/
// Function pour filtrer les ingredients
function filterByIngredient(selectedItems, recipes) {
  const ingredientsFilter = selectedItems.filter(
    (selectedItem) => selectedItem.listId === "ingredient-list"
  );
  const results = recipes.filter(function (recipe) {
    let match = true;
    ingredientsFilter.forEach(function (selectedItem) {
      const result = recipe.ingredients.find(function (i) {
        return i.ingredient.toLowerCase() === selectedItem.item.toLowerCase();
      });
      if (!result) {
        match = false;
      }
    });
    return match;
  });
  return results;
}

// Function pour filtrer les Appareils
function filterByAppliance(selectedItems, recipes) {
  const applianceFilter = selectedItems.filter(
    (selectedItem) => selectedItem.listId === "appliance-list"
  );
  const results = recipes.filter(function (recipe) {
    if (applianceFilter.length === 0) {
      return true;
    }
    if (!recipe.appliance) {
      return false;
    }
    const findIndex = applianceFilter.findIndex(
      (selectedItem) =>
        selectedItem.item.toLowerCase() === recipe.appliance.toLowerCase()
    );
    return findIndex > -1;
  });
  return results;
}

// Function pour filtrer les Ustensils
function filterByUstensil(selectedItems, recipes) {
  const ustensilsFilter = selectedItems.filter(
    (selectedItem) => selectedItem.listId === "ustensil-list"
  );

  const results = recipes.filter(function (recipe) {
    let match = true;
    if (ustensilsFilter.length > 0) {
      ustensilsFilter.forEach(function (selectedItem) {
        const result = recipe.ustensils.find(function (u) {
          return u.toLowerCase() === selectedItem.item.toLowerCase();
        });
        if (!result) {
          match = false;
        }
      });
    }
    return match;
  });
  return results;
}

// Funtion pour la dropdown ingredient
function initDropdownIngredient(ingredients, selectedItems, callback) {
  const selectedIngredients = selectedItems.map(
    (selectedItem) => selectedItem.item
  );
  const ulElement = document.getElementById("ingredient-list");
  ulElement.innerHTML = "";
  let filteredIngredients = ingredients;
  if (selectedIngredients) {
    let filteredSelectedIngredients = selectedIngredients.filter((ingredient) =>
      ingredients.includes(ingredient)
    );
    filteredSelectedIngredients.forEach(function (ingredient, index) {
      const liElement = document.createElement("li");
      liElement.textContent = ingredient;
      showSelectedItems(liElement);
      ulElement.append(liElement);
    });
    filteredIngredients = ingredients.filter(
      (i) => !selectedIngredients.includes(i)
    );
  }

  filteredIngredients.forEach(function (ingredient, index) {
    const liElement = document.createElement("li");
    if (index === 0) {
      liElement.classList.add("first");
    }

    liElement.textContent = ingredient;
    ulElement.append(liElement);
  });
  if (callback) {
    callback();
  }
}

// Funtion pour la dropdown appareil
function initDropdownAppliance(appliances, selectedItems, callback) {
  const selectedAppliances = selectedItems.map(
    (selectedItem) => selectedItem.item
  );
  const ulElement = document.getElementById("appliance-list");
  ulElement.innerHTML = "";
  let filteredAppliances = appliances;

  if (selectedAppliances) {
    let filteredSelectedAppliances = selectedAppliances.filter((appliance) =>
      appliances.includes(appliance)
    );
    filteredSelectedAppliances.forEach(function (appliance, index) {
      const liElement = document.createElement("li");
      liElement.textContent = appliance;
      showSelectedItems(liElement);
      ulElement.append(liElement);
    });
    filteredAppliances = appliances.filter(
      (i) => !selectedAppliances.includes(i)
    );
  }

  filteredAppliances.forEach(function (appliance, index) {
    const liElement = document.createElement("li");
    if (index === 0) {
      liElement.classList.add("first");
    }
    liElement.textContent = appliance;
    ulElement.append(liElement);
  });
  if (callback) {
    callback();
  }
}

// Funtion pour la dropdown ustensil
function initDropdownUstensil(ustensils, selectedItems, callback) {
  const selectedUstensils = selectedItems.map(
    (selectedItem) => selectedItem.item
  );
  const ulElement = document.getElementById("ustensil-list");
  ulElement.innerHTML = "";
  let filteredUstensils = ustensils;

  if (selectedUstensils) {
    let filteredSelectedUstensils = selectedUstensils.filter((ustensil) =>
      ustensils.includes(ustensil)
    );
    filteredSelectedUstensils.forEach(function (ustensil, index) {
      const liElement = document.createElement("li");
      liElement.textContent = ustensil;
      showSelectedItems(liElement);
      ulElement.append(liElement);
    });
    filteredUstensils = ustensils.filter((i) => !selectedUstensils.includes(i));
  }
  filteredUstensils.forEach(function (ustensil, index) {
    const liElement = document.createElement("li");
    if (index === 0) {
      liElement.classList.add("first");
    }
    liElement.textContent = ustensil;
    ulElement.append(liElement);
  });
  if (callback) {
    callback();
  }
}

// Funtion pour afficher les recettes
function displayRecipes(recipes) {
  if (cardContainer) {
    cardContainer.innerHTML = "";
    recipes.forEach(function (recipe) {
      const template = generateCard(recipe);
      cardContainer.insertAdjacentHTML("beforeend", template);
    });
  }
  // Mise à jour du nombre de recettes
  const recipeNumberElement = document.getElementById("recipe-number");
  recipeNumberElement.textContent = recipes.length;
}

// Funtion pour afficher les tags
function displayTags() {
  const tagsContainer = document.getElementById("selected__tags__container");
  tagsContainer.innerHTML = "";
  selectedItems.forEach((selectedItemObj) => {
    const p = document.createElement("p");
    let crossIcon = document.createElement("i");
    p.innerHTML = selectedItemObj.item;
    p.classList.add("tag__selection");
    crossIcon.classList.add("fa-solid", "fa-xmark");
    p.appendChild(crossIcon);
    p.dataset.listId = selectedItemObj.listId;
    tagsContainer.append(p);
    crossIcon.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("click", e.target.closest("p").dataset.listId);
      const listId = e.target.closest("p").dataset.listId;
      const item = e.target.closest("p").textContent;
      selectedItems = selectedItems.filter(
        (selectedItemObj) => selectedItemObj.item !== item
      );
      /**
       * recalculer tout
       */
      fullResearch();
      updateDropdowns();
      displayTags();
    });
  });
}
