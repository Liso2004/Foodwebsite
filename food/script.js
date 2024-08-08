
function order() {
    alert("Your order has been placed!");
}

function submitForm(event) {
    event.preventDefault();
    // Code to handle form submission (e.g., send data to server)
    alert("Form submitted successfully!");
}
const restaurantLocations = [
  { name: "Restaurant 1", city: "New York", area: "Manhattan" },
  { name: "Restaurant 2", city: "Los Angeles", area: "Hollywood" },
  { name: "Restaurant 3", city: "Chicago", area: "Downtown" },
  { name: "Restaurant 4", city: "Cape town", area: "Waterfront"},
  // Add more locations here...
];

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

document.getElementById("search-button").addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  const filteredLocations = restaurantLocations.filter((location) => {
    return (
      location.name.toLowerCase().includes(searchTerm) ||
      location.city.toLowerCase().includes(searchTerm) ||
      location.area.toLowerCase().includes(searchTerm)
    );
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
});