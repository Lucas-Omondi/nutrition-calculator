// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const ingredientList = document.getElementById('ingredient-list');
    const addIngredientButton = document.getElementById('add-ingredient');
    const calculateButton = document.querySelector('button[type="submit"]');
    const calculatorSection = document.querySelector('.calculator-section');

    // Add event listener to "Add Another Ingredient" button
    addIngredientButton.addEventListener('click', addIngredientRow);

    // Add new ingredient row with the same structure and styling
    function addIngredientRow() {
        const ingredientRow = document.createElement('div');
        ingredientRow.className = 'ingredient-row row g-2 align-items-center';

        ingredientRow.innerHTML = `
            <div class="col-md-5">
                <label for="food" class="form-label">Select Food:</label>
                <select class="form-select food-dropdown" name="food" required>
                    <option value="" disabled selected>Select a food item</option>
                    <option value="chicken">Chicken Breast</option>
                    <option value="rice">Rice</option>
                    <option value="broccoli">Broccoli</option>
                    <option value="eggs">Eggs</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="quantity" class="form-label">Quantity (grams or servings):</label>
                <input type="number" class="form-control quantity-input" min="1" placeholder="e.g., 100" required>
            </div>
            <div class="col-md-3 text-md-end">
                <button type="button" class="btn btn-danger remove-ingredient">Remove</button>
            </div>
        `;

        const removeButton = ingredientRow.querySelector('.remove-ingredient');
        removeButton.addEventListener('click', () => {
            ingredientRow.remove();
            toggleCalculateButton();
        });

        const quantityInput = ingredientRow.querySelector('.quantity-input');
        quantityInput.addEventListener('input', toggleCalculateButton);

        ingredientList.appendChild(ingredientRow);
        toggleCalculateButton(); // Check if the button should be enabled
    }

    // Toggle the calculate button based on any valid input
    function toggleCalculateButton() {
        const quantityInputs = document.querySelectorAll('.quantity-input');
        let anyValid = false;

        // Check for any positive quantity input
        quantityInputs.forEach(input => {
            console.log(`Checking input value: ${input.value}`); // Debugging output
            if (input.value && parseFloat(input.value) > 0) {
                anyValid = true;
            }
        });

        console.log(`Button enabled: ${anyValid}`); // Debugging output
        calculateButton.disabled = !anyValid;
    }

    // Check if the calculator section is visible in the viewport
    function checkVisibility() {
        const rect = calculatorSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            document.body.classList.add('calculator-active');
        } else {
            document.body.classList.remove('calculator-active');
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', checkVisibility);
});
