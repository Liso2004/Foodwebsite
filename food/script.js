// Import the Firebase JavaScript SDK
import firebase from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Firebase app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Define the restaurant locations collection
const restaurantLocationsRef = db.ref('restaurantLocations');

// Submit form data to the Realtime Database
function submitContactForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  const city = formData.get('city');
  const area = formData.get('area');

  // Create a new location object
  const newLocation = {
    name: name,
    city: city,
    area: area
  };
// Order button and error handler
const orderButton = document.getElementById('order-button');
const errorElement = document.getElementById('error-message');

orderButton.addEventListener('click', () => {

// Order button and error handler
const orderButton = document.getElementById('order-button');
const errorElement = document.getElementById('error-message');

orderButton.addEventListener('click', () => {
  try {
    // Your order processing logic goes here
    // For example, you might make an AJAX request or call a function
    // to handle the order submission
    console.log('Order submitted successfully!');
  } catch (error) {
    // If an error occurs, display the error message
    errorElement.textContent = `Error: ${error.message}`;
  }
});
  // Send the form data to your server or email
  console.log('Form submitted:', name, email, message);

  // Push the new location to the Firebase Realtime Database
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