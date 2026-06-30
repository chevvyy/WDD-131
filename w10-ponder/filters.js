const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions: "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions: "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description: "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions: "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

// Grab the elements we need to work with.
let hikeContainer = document.querySelector('#hike-container');
let input = document.querySelector('#search');
let button = document.querySelector('button');

/* ---------- SEARCH: filter, then sort ---------- */
function search() {
  let hikeQuery = input.value.toLowerCase();

  // .filter() builds a new array of hikes that match the search in the
  // name, the description, OR any tag.
  let filteredHikes = hikes.filter(function (hike) {
    return (
      // .includes() checks whether the query appears in a string
      hike.name.toLowerCase().includes(hikeQuery) ||
      hike.description.toLowerCase().includes(hikeQuery) ||
      // .find() scans the tags array and returns a match if one contains it
      hike.tags.find(tag => tag.toLowerCase().includes(hikeQuery))
    );
  });

  // Sort the surviving hikes by DISTANCE (shortest first).
  let sortedHikes = filteredHikes.sort(compareByDistance);

  // Clear previous results, then render the sorted list.
  hikeContainer.innerHTML = '';
  sortedHikes.forEach(function (hike) {
    renderHike(hike);
  });
}

/* ---------- SORT helper: compare by distance ---------- */
// distance is a string like "2.2 miles", so parseFloat pulls the number
// off the front ("2.2 miles" -> 2.2) so we can compare numerically.
function compareByDistance(a, b) {
  let distA = parseFloat(a.distance);
  let distB = parseFloat(b.distance);
  if (distA < distB) {
    return -1;
  } else if (distA > distB) {
    return 1;
  }
  return 0;
}

/* ---------- TEMPLATES ---------- */
// .map() turns each tag string into a button, joined into one string.
function tagTemplate(tags) {
  return tags.map(tag => `<button>${tag}</button>`).join(' ');
}

// A for loop runs a set number of times (1 through 5) to build the boots:
// a boot for each difficulty level, a placeholder for the rest.
function difficultyTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Difficulty: ${rating} out of 5"> Difficulty: `;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-boot">🥾</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-empty">▫️</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function hikesTemplate(hike) {
  return `<div class="hike-card">
  <div class="hike-content">
    <h2>${hike.name}</h2>
    <div class="hike-tags">
      ${tagTemplate(hike.tags)}
    </div>
    <p>${hike.description}</p>
    <p>Distance: ${hike.distance}</p>
    <p>${difficultyTemplate(hike.difficulty)}</p>
  </div>
</div>`;
}

function renderHike(hike) {
  hikeContainer.innerHTML += hikesTemplate(hike);
}

/* ---------- EVENTS ---------- */
button.addEventListener('click', search);

// Let the Enter key trigger a search too, not just the button.
input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    search();
  }
});

/* ---------- INITIAL RANDOM HIKE ---------- */
// Math.random() gives a decimal 0–1; multiply by the array length and
// floor it to get a valid random index, then show that one hike.
function init() {
  let randomNum = Math.floor(Math.random() * hikes.length);
  renderHike(hikes[randomNum]);
}

init();