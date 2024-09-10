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
}) 

const ustensils = recipes.flatMap(function (recipe) {
  return recipe.ustensils;
})


/*============================ Set ===============================*/
// Elimination des doublons automatiquement grâce à set et mis dans un tableau pour créer un tableau
const cleanIngredients = [...new Set(ingredients)];
const cleanAppliance = [...new Set(appliance)]
const cleanUstensils = [...new Set(ustensils)];

/*============================ Sort ===============================*/
// Classement des éléments par ordre alphabetique avec sort
cleanIngredients.sort();
cleanAppliance.sort();
cleanUstensils.sort();

console.log("cleanAppliance ===> ", cleanAppliance)
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
    return applianceArray.includes(recipe.appliance)
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
  filterByUstensil([searchUstensil, cleanUstensils[5]])
);