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

function initDropdownData(recipes) {
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

// Function pour filtrer les Appareils
function filterByAppliance(applianceArray, recipes) {
  const results = recipes.filter(function (recipe) {
    return applianceArray.includes(recipe.appliance);
  });
  return results;
}

// Function pour filtrer les Ustensils
function filterByUstensil(ustensilArray, recipes) {
  const results = recipes.filter(function (recipe) {
    return ustensilArray.every(function (ustensil) {
      return recipe.ustensils.includes(ustensil);
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
    filteredUstensils = ustensils.filter(
      (i) => !selectedUstensils.includes(i)
    );
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

function displayTags(selectedItems) {
  const tagsContainer = document.getElementById('selected__tags__container');
  tagsContainer.innerHTML = '';
  selectedItems.forEach((selectedItem) => {
    const p = document.createElement('p');
    let crossIcon = document.createElement("i");    
    p.innerHTML = selectedItem;
    p.classList.add('tag__selection')
    crossIcon.classList.add("fa-solid", "fa-xmark");
    p.appendChild(crossIcon);
    tagsContainer.append(p);
  })
}

function removeTags(p) {
  // supprimer la classe
  // supprimer le span
  li.classList.remove("selectedItem");
  li.innerHTML = li.textContent;
  /**
   * supprimer le tag
   */
}