// Import the Firebase JavaScript SDK
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize the Firebase app
firebase.initializeApp({
  apiKey: '<API_KEY>',
  authDomain: '<AUTH_DOMAIN>',
  databaseURL: '<DATABASE_URL>',
  projectId: '<PROJECT_ID>',
  storageBucket: '<STORAGE_BUCKET>',
  messagingSenderId: '<MESSAGING_SENDER_ID>'
});

// Get a reference to the Realtime Database
const db = firebase.database();

// Define the restaurant locations collection
const restaurantLocationsRef = db.ref('restaurantLocations');

// Submit form data to the Realtime Database
function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target); // Get the form data
  const newLocation = {
    name: formData.get('name'),
    city: formData.get('city'),
    area: formData.get('area')
  };
  restaurantLocationsRef.push(newLocation)
    .then(() => {
      alert("Form submitted successfully!");
    })
    .catch(error => console.error(error));
}

// Search for locations in the Realtime Database
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

document.getElementById("search-button").addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  restaurantLocationsRef.orderByChild('name').startAt(searchTerm).endAt(searchTerm + '\uf8ff')
    .once('value', (snapshot) => {
      const filteredLocations = [];
      snapshot.forEach((childSnapshot) => {
        const location = childSnapshot.val();
        if (location.name.toLowerCase().includes(searchTerm) ||
            location.city.toLowerCase().includes(searchTerm) ||
            location.area.toLowerCase().includes(searchTerm)) {
          filteredLocations.push(location);
        }
      });
      if (filteredLocations.length === 0) {
        searchResults.innerHTML = `
          <p>Sorry, no locations found matching your search term.</p>
        `;
      } else {
        searchResults.innerHTML = "";
        filteredLocations.forEach((location) => {
          const resultHTML = `
            <p>${location.name} - ${location.city}, ${location.area}</p>
          `;
          searchResults.insertAdjacentHTML("beforeend", resultHTML);
        });
      }
    })
    .catch(error => console.error(error));
});