/* Grab the elements we work with. recipes[] comes from recipes.js,
   which is loaded before this file in index.html. */
let recipeContainer = document.querySelector('#recipe-container');
let searchForm = document.querySelector('.search');
let searchInput = document.querySelector('.search input');

/* ---------- SEARCH: filter, then sort ---------- */
function searchRecipes(event) {
  // The search bar is a <form>, so stop it from reloading the page.
  if (event) {
    event.preventDefault();
  }

  let query = searchInput.value.toLowerCase();

  // .filter() builds a new array of recipes that match the query in the
  // name, the description, OR any tag.
  let results = recipes.filter(function (recipe) {
    return (
      // .includes() checks whether the query appears in a string
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      // .find() scans the tags array and returns a match if one contains it
      recipe.tags.find(tag => tag.toLowerCase().includes(query))
    );
  });

  // Sort the matches alphabetically by recipe name.
  results.sort(compareByName);

  renderRecipes(results);
}

/* ---------- SORT helper: compare by name ---------- */
function compareByName(a, b) {
  // Lowercase both so the sort isn't thrown off by capitalization.
  let nameA = a.name.toLowerCase();
  let nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  }
  return 0;
}

/* ---------- TEMPLATES ---------- */
// .map() turns each tag into a styled span, joined into one string.
function tagTemplate(tags) {
  return tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
}

// A for loop runs 1–5 to build the stars: a filled star for each rating
// point, an empty star for the rest. The aria-label carries the exact value.
function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `<article class="recipe-card">
  <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}" />
  <div class="recipe-content">
    <div class="tag-list">${tagTemplate(recipe.tags)}</div>
    <h2>${recipe.name}</h2>
    ${ratingTemplate(recipe.rating)}
    <p class="recipe-description">${recipe.description}</p>
  </div>
</article>`;
}

/* ---------- RENDER ---------- */
function renderRecipes(list) {
  // .map() builds an array of card strings; join() makes one HTML string.
  recipeContainer.innerHTML = list.map(recipeTemplate).join('');
}

/* ---------- EVENTS ---------- */
searchForm.addEventListener('submit', searchRecipes);

/* ---------- INITIAL RANDOM RECIPE ---------- */
// Math.random() gives a decimal 0–1; multiply by the array length and
// floor it to get a valid random index, then show that one recipe.
function init() {
  let randomNum = Math.floor(Math.random() * recipes.length);
  renderRecipes([recipes[randomNum]]);
}

init();