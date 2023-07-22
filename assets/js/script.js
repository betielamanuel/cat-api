const apiKey = 'live_jpBJMv2UKTY8vFNv0aT9bNUfGKTiaEqN6UQ9jXO4sVpgVmJdsAdgQ6JKTlKOpyk1';


const catGallery = document.getElementById('catGallery');
const breedSelect = document.getElementById('breedSelect');

// Function to fetch and populate the breed options in the select element
function fetchBreeds() {
fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
    'x-api-key': apiKey,
    },
})
    .then((response) => response.json())
    .then((data) => {
    data.forEach((breed) => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
    });
    })
    .catch((error) => console.error('Error fetching breed data:', error));
}

// Function to fetch and display cat images based on selected breed
function fetchCatsByBreed(breedId) {
fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`, {
    headers: {
    'x-api-key': apiKey,
    },
})
    .then((response) => response.json())
    .then((data) => {
    catGallery.innerHTML = ''; // Clear previous images
    data.forEach((cat) => {
        const catImage = document.createElement('img');
        catImage.classList.add('cat-image');
        catImage.src = cat.url;
        catGallery.appendChild(catImage);
    });
    })
    .catch((error) => console.error('Error fetching cat data:', error));
}

// Event listener to handle breed selection change
breedSelect.addEventListener('change', (event) => {
const selectedBreedId = event.target.value;
fetchCatsByBreed(selectedBreedId);
});

const sizeSelect = document.getElementById('sizeSelect');

// Function to fetch and display cat images based on selected breed and size
function fetchCatsByBreedAndSize(breedId, size) {
    
fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&size=${size}&limit=100`, {
    headers: {
    'x-api-key': apiKey,
    },
})
    .then((response) => response.json())
    .then((data) => {
    catGallery.innerHTML = ''; // Clear previous images
    data.forEach((cat) => {
        const catImage = document.createElement('img');
        catImage.classList.add('cat-image');
        catImage.src = cat.url;
        catGallery.appendChild(catImage);
    });
    })
    .catch((error) => console.error('Error fetching cat data:', error));
}

// Event listener to handle size selection change
sizeSelect.addEventListener('change', () => {
const selectedBreedId = breedSelect.value;
const selectedSize = sizeSelect.value;
fetchCatsByBreedAndSize(selectedBreedId, selectedSize);
});

// Fetch the breed list on page load
fetchBreeds();
