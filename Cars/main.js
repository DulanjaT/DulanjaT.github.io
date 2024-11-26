"use strict";

// Accessing the form elements and initializing the array to store car data
const carAdditionForm = document.querySelector("#addCar");
const carSearchForm = document.querySelector("#searchCar");
const carInventory = [];

// Defining a class to represent car details
class Vehicle {
    constructor(plateNumber, manufacturer, carModel, ownerName, cost, paintColor, manufacturingYear) {
        this.plateNumber = plateNumber; // License plate
        this.manufacturer = manufacturer; // Car maker
        this.carModel = carModel; // Car model
        this.ownerName = ownerName; // Owner name
        this.cost = parseFloat(cost); // Car price
        this.paintColor = paintColor; // Car color
        this.manufacturingYear = parseInt(manufacturingYear); // Year of manufacture
    }

    // Method to calculate car age
    calculateAge() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.manufacturingYear;
    }

    // Method to get discounted price based on car age
    calculateDiscountPrice() {
        return this.calculateAge() > 10 ? this.cost * 0.85 : this.cost;
    }

    // Check if car is eligible for discount
    hasDiscount() {
        return this.calculateAge() > 10;
    }
}

// Function to display messages to the user
const showNotification = (msg, type = "success") => {
    const notificationElement = document.querySelector("#message");
    notificationElement.textContent = msg;
    notificationElement.className = type;
    setTimeout(() => {
        notificationElement.textContent = "";
        notificationElement.className = "";
    }, 3000);
};

// Function to add a new car
const saveCar = (event) => {
    event.preventDefault();

    try {
        // Extract input values and validate
        const plateNumber = document.querySelector("#license").value.trim();
        const manufacturer = document.querySelector("#maker").value.trim();
        const carModel = document.querySelector("#model").value.trim();
        const ownerName = document.querySelector("#owner").value.trim();
        const cost = parseFloat(document.querySelector("#price").value.trim());
        const paintColor = document.querySelector("#color").value.trim();
        const manufacturingYear = parseInt(document.querySelector("#year").value.trim());
        const currentYear = new Date().getFullYear();

        if (!plateNumber || !manufacturer || !carModel || !ownerName || isNaN(cost) || !paintColor || isNaN(manufacturingYear)) {
            throw new Error("All fields are required and must be valid.");
        }

        if (cost <= 0) {
            throw new Error("Price must be a positive number.");
        }

        if (manufacturingYear < 1886 || manufacturingYear > currentYear) {
            throw new Error(`Year must be between 1886 and ${currentYear}.`);
        }

        // Create a new car object and store it
        const carData = new Vehicle(plateNumber, manufacturer, carModel, ownerName, cost, paintColor, manufacturingYear);
        carAdditionForm.reset();
        carInventory.push(carData);

        // Save updated inventory to local storage
        localStorage.setItem('carInventory', JSON.stringify(carInventory));

        // Update the table and notify the user
        renderTable();
        showNotification("Car added successfully!");

    } catch (error) {
        showNotification(error.message, "error");
    }
};

// Function to load cars from local storage
const initializeCars = () => {
    const storedData = localStorage.getItem('carInventory');
    if (storedData) {
        const parsedCars = JSON.parse(storedData);
        parsedCars.forEach((car) => {
            carInventory.push(new Vehicle(car.plateNumber, car.manufacturer, car.carModel, car.ownerName, car.cost, car.paintColor, car.manufacturingYear));
        });
        renderTable();
    }
};

// Function to display car data in a table
const renderTable = () => {
    const tableBody = document.querySelector("#carsTable");

    // Reset the table content while keeping the header
    tableBody.innerHTML = tableBody.rows[0].innerHTML;

    carInventory.forEach((car, index) => {
        const row = tableBody.insertRow(-1);
        const { plateNumber, manufacturer, carModel, ownerName, manufacturingYear, paintColor, cost } = car;

        // Insert car details into the table
        [plateNumber, manufacturer, carModel, ownerName, manufacturingYear, paintColor].forEach((value) => {
            row.insertCell(-1).textContent = value ?? 'N/A';
        });

        row.insertCell(-1).textContent = `${cost.toFixed(2)}€`;

        // Add discounted price if applicable
        const discountInfo = car.hasDiscount() ? `$${car.calculateDiscountPrice().toFixed(2)}` : "No Discount";
        row.insertCell(-1).textContent = discountInfo;

        // Add delete button to each row
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.classList.add("delete");
        removeBtn.addEventListener("click", () => removeCar(index));
        row.insertCell(-1).appendChild(removeBtn);
    });
};

// Function to delete a car
const removeCar = (index) => {
    carInventory.splice(index, 1);
    localStorage.setItem('carInventory', JSON.stringify(carInventory));
    renderTable();
    showNotification("Car deleted successfully!");
};

// Function to search for a car by license plate
const findCar = (event) => {
    event.preventDefault();
    const searchQuery = document.querySelector("#search").value.trim();
    const result = carInventory.find((car) => car.plateNumber.toLowerCase() === searchQuery.toLowerCase());
    const searchResultDisplay = document.querySelector("#searchResult");

    if (result) {
        const originalCost = result.cost.toFixed(2);
        const discountedCost = result.hasDiscount() ? `$${result.calculateDiscountPrice().toFixed(2)}` : "No Discount";

        searchResultDisplay.innerHTML = `
            <p>Maker: ${result.manufacturer}</p>
            <p>Model: ${result.carModel}</p>
            <p>Owner: ${result.ownerName}</p>
            <p>Year: ${result.manufacturingYear}</p>
            <p>Original Price: $${originalCost}</p>
            <p>Discounted Price: ${discountedCost}</p>
            <p>Color: ${result.paintColor}</p>
        `;
    } else {
        searchResultDisplay.innerHTML = "<p>No car found with the given license plate.</p>";
    }
};

// Attach event listeners
carAdditionForm.addEventListener("submit", saveCar);
carSearchForm.addEventListener("submit", findCar);
window.addEventListener('load', initializeCars);
