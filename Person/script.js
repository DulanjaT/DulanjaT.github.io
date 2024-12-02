// Defining an asynchronous function to fetch and display user data
async function fetchUsers() {
    try {
        // Send a GET request to fetch user data from the API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        // Parse the JSON response into a JavaScript object
        const data = await response.json();

        // Select the container element where user cards will be displayed
        const userCardsContainer = document.getElementById("userCards");

        // Clearing any existing content in the user cards container
        userCardsContainer.innerHTML = "";

        // Iterating through the fetched user data
        data.forEach(user => {
            // Creating a new div element for each user card
            const card = document.createElement("div");
            // Add a CSS class to style the user card
            card.classList.add("user-card");

            // Set the inner HTML of the card with user details and a generated avatar
            card.innerHTML = `
            <img src="https://robohash.org/${user.id}" alt="Robot Avatar">
            <h3>${user.name}</h3>
            <p><strong>Username: </strong>${user.username}</p>
            <p><strong>Email: </strong>${user.email}</p>
            <p><strong>ID: </strong>${user.id}`;

            // Append the user card to the container
            userCardsContainer.appendChild(card);
        });

    } catch (error) {
        // Log any errors that occur during the fetch or processing
        console.error("Error:", error);
    }
}

// Call the function to fetch and display user data
fetchUsers();
