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

  console.log("cleanIngredients", cleanIngredients);

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
function filterByIngredient(ingredientArray, recipes) {
  const results = recipes.filter(function (recipe) {
    let match = true;
    ingredientArray.forEach(function (ingredient) {
      const result = recipe.ingredients.find(function (i) {
        return i.ingredient.toLowerCase() === ingredient.toLowerCase();
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

// Function pour filtrer les Appareils
function filterByAppliance(applianceArray, recipes) {
  console.log("filter by appliance", applianceArray, recipes);
  
  const results = recipes.filter(function (recipe) {
    if (!recipe.appliance) {
      return false;
    }
    return applianceArray.includes(capitalizeFirstLetter(recipe.appliance));
  });
  console.log("filter by appliance results", results);
  return results;
}

// Function pour filtrer les Ustensils
function filterByUstensil(ustensilArray, recipes) {
  // need to be rewrite
  console.log("filter by ustensil");
  const results = recipes.filter(function (recipe) {
    return ustensilArray.every(function (ustensil) {
      return recipe.ustensils.includes(ustensil, ustensil.toLowerCase());
    });
  });
  return results;
}

// Funtion pour la dropdown ingredient
function initDropdownIngredient(ingredients, selectedIngredients, callback) {
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
function initDropdownAppliance(appliances, selectedAppliances, callback) {
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
function initDropdownUstensil(ustensils, selectedUstensils, callback) {
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
    console.log("cardContainer", cardContainer);
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
function displayTags(selectedItems) {
  const tagsContainer = document.getElementById("selected__tags__container");
  tagsContainer.innerHTML = "";
  selectedItems.forEach((selectedItem) => {
    const p = document.createElement("p");
    let crossIcon = document.createElement("i");
    p.innerHTML = selectedItem;
    p.classList.add("tag__selection");
    crossIcon.classList.add("fa-solid", "fa-xmark");
    p.appendChild(crossIcon);
    tagsContainer.append(p);
  });
}

// Funtion pour supprimer les tags
function removeTags(p) {
  // supprimer la classe
  // supprimer le span
  li.classList.remove("selectedItem");
  li.innerHTML = li.textContent;
  /**
   * supprimer le tag
   */
}
