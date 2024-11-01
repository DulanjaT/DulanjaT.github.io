document.addEventListener("DOMContentLoaded", function () {
    const customerName = document.getElementById("customerName");
    const pancakeType = document.getElementById("type");
    const toppings = document.querySelectorAll("input[data-category='toppings']");
    const extras = document.querySelectorAll("input[data-category='extras']");
    const deliveryOptions = document.querySelectorAll("input[name='delivery']");
    const totalPriceElement = document.getElementById("totalPrice");
    const orderSummary = document.querySelector(".order-summary");
    const orderButton = document.getElementById("button");
    let orders = [];

    // Function to calculate total price
    function calculateTotalPrice() {
        let total = 0;

        // Get the base price of the selected pancake type
        const selectedPancake = pancakeType.options[pancakeType.selectedIndex];
        total = total + parseInt(selectedPancake.dataset.price);

        // Add prices of selected toppings
        toppings.forEach((topping) => {
            if (topping.checked) {
                total = total + parseInt(topping.value);
            }
        });

        // Add prices of selected extras
        extras.forEach((extra) => {
            if (extra.checked) {
                total = total + parseInt(extra.value);
            }
        });

        // Animating price banner
        const priceBanner = document.querySelector('.price-banner');
        priceBanner.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' },
            ],
            {
                duration: 100,
                iterations: 1,
            }
        );

        // Add delivery charge if "Delivery" option is selected
        const selectedDelivery = document.querySelector(
            "input[name='delivery']:checked"
        );
        if (selectedDelivery && selectedDelivery.value === "delivery") {
            total += 5;
        }

        // Update the total price in the UI
        totalPriceElement.textContent = total + "€";
        return total; // return the total to use for order storage
    }

    // Function to display the order summary
    function displayOrderSummary() {
        const customer = customerName.value || "Guest";
        const selectedPancake = pancakeType.options[pancakeType.selectedIndex].dataset.name;

        // Get selected toppings and extras
        const selectedToppings = Array.from(toppings)
            .filter((topping) => topping.checked)
            .map((topping) => topping.dataset.name);

        const selectedExtras = Array.from(extras)
            .filter((extra) => extra.checked)
            .map((extra) => extra.dataset.name);

        const selectedDelivery = document.querySelector(
            "input[name='delivery']:checked"
        )?.value || "N/A";

        // Update summary in the UI
        document.getElementById("order_name").textContent = customer;
        document.getElementById("order_type").textContent = selectedPancake;
        document.getElementById("order_toppings").textContent = selectedToppings.length > 0 ? selectedToppings.join() : "None";
        document.getElementById("order_extras").textContent = selectedExtras.length > 0 ? selectedExtras.join(", ") : "None";
        document.getElementById("order_delivery").textContent = selectedDelivery;
        document.getElementById("order_price").textContent = totalPriceElement.textContent;

        // Store the order in the orders array
        orders.push({
            customer: customer,
            pancake: selectedPancake,
            toppings: selectedToppings,
            extras: selectedExtras,
            delivery: selectedDelivery,
            total: calculateTotalPrice()
        });

        orderSummary.style.display = "block"; // Show order summary
    }

    // Event listeners for pancake type, toppings, extras, and delivery options
    pancakeType.addEventListener("change", calculateTotalPrice);
    toppings.forEach((topping) => topping.addEventListener("change", calculateTotalPrice));
    extras.forEach((extra) => extra.addEventListener("change", calculateTotalPrice));
    deliveryOptions.forEach((option) => option.addEventListener("change", calculateTotalPrice));

    // Event listener for the "See Order" button
    orderButton.addEventListener("click", displayOrderSummary);
});