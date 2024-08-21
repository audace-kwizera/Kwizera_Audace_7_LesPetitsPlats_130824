function generateCard(data) {
  function generateIngredients(ingredients) {
    function getIngredients() {
      let html = "";
      ingredients.forEach(function (ingredient) {
        html += `
             <div
                    class="container__main__card__description__ingredient__item container"
                  >
                    <p>${ingredient.ingredient}</p>
                    <p>${ingredient.quantity ? ingredient.quantity : ""}${
          ingredient.unit ? ingredient.unit : ""
        }</p>
                  </div>
            `;
      });
      return html;
    }
    if (ingredients && ingredients.length > 0) {
      const template = `
         <!-- Ingredients -->
              <div class="container__main__card__description container">
                <h4>INGREDIENTS</h4>
                <!-- Ingredients -->
                <div
                  class="container__main__card__description__ingredient container"
                >

                ${getIngredients()}
                </div>
              </div>
        `;
      return template;
    }
    return "";
  }
  const template = `
     <figure class="card">
            <img
              src="./assets/images/${data.image}"
              alt="${data.name}"
            />
            <figcaption class="card__description">
              <h3>${data.name}</h3>
              <!-- Recette -->
              <div class="container__main__card__description container">
                <h4>RECETTE</h4>
                <p>
                    ${data.description}
                </p>
              </div>
             ${generateIngredients(data.ingredients)}
            </figcaption>
          </figure>
    `;
  return template;
}
