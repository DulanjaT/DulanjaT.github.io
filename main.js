// Car class definition
class Car {
    constructor(license, maker, model, owner, price, year, color) {
        this.license = license;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = price;
        this.year = year;
        this.color = color;
    }

    // Method to calculate discount based on the car's age
    calculateDiscount() {
        const currentYear = new Date().getFullYear();
        const age = currentYear - this.year;
        return age > 10 ? this.price * 0.85 : this.price;
    }
}

// Array to store car objects
let carsArray = [];

// Function to display cars in the table
function displayCars() {
    const tbody = document.querySelector("#carsTable tbody");
    tbody.innerHTML = ""; // Clear the table body

    carsArray.forEach(car => {
        const row = document.createElement("tr");

        // Create cells for each car property
        row.innerHTML = `
        <td>${car.license}</td>
        <td>${car.maker}</td>
        <td>${car.model}</td>
        <td>${car.owner}</td>
        <td>${car.year}</td>
        <td><div style="background-color: ${car.color}; width: 50px; height: 20px;"></div></td>
        <td>${car.price}€</td>
        <td>${car.calculateDiscount() < car.price ? car.calculateDiscount().toFixed(2) + "€" : "No Discount"}</td>
        <td><button class="delete" onclick="deleteCar('${car.license}')">Delete</button></td>
      `;
        tbody.appendChild(row);
    });
}

// Function to add a car
function addCar(e) {
    e.preventDefault(); // Prevent form submission reload

    const license = document.getElementById("license").value.trim();
    const maker = document.getElementById("maker").value.trim();
    const model = document.getElementById("model").value.trim();
    const owner = document.getElementById("owner").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const year = parseInt(document.getElementById("year").value);
    const color = document.getElementById("color").value;

    // Validation
    if (!license || !maker || !model || !owner || isNaN(price) || isNaN(year)) {
        showMessage("Please fill in all required fields correctly", "error");
        return;
    }
    if (price <= 0) {
        showMessage("Price must be a positive number", "error");
        return;
    }
    const currentYear = new Date().getFullYear();
    if (year < 1886 || year > currentYear) {
        showMessage(`Year must be between 1886 and ${currentYear}`, "error");
        return;
    }

    // Create new car object and add it to the array
    const car = new Car(license, maker, model, owner, price, year, color);
    carsArray.push(car);

    // Display the updated car list and reset the form
    displayCars();
    document.getElementById("addCar").reset();
    showMessage("Car added successfully", "success");
}

// Function to delete a car
function deleteCar(license) {
    carsArray = carsArray.filter(car => car.license !== license);
    displayCars();
    showMessage("Car deleted successfully", "success");
}

// Function to search for a car by license plate
function searchCar(event) {
    event.preventDefault();

    const searchValue = document.getElementById("search").value.trim();

    if (!searchValue) {
        showMessage("Please enter a license plate to search", "error");
        return;
    }

    const car = carsArray.find(car => car.license === searchValue);

    const searchResult = document.getElementById("searchResult");

    if (car) {
        const discountedPrice = car.calculateDiscount() < car.price ? car.calculateDiscount().toFixed(2) + "€" : "No Discount";
        searchResult.textContent = `Found Car: ${car.maker} ${car.model}, Owner: ${car.owner}, Price: ${car.price}€, Discounted Price: ${discountedPrice}`;
    } else {
        searchResult.textContent = "Car not found";
    }
}

// Function to show success/error message
function showMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type; // Add success or error class



}

// Event listeners
document.getElementById("addCar").addEventListener("submit", addCar);
document.getElementById("searchCar").addEventListener("submit", searchCar);