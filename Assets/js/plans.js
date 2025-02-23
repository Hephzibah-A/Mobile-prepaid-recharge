document.addEventListener("DOMContentLoaded", function () {
    const planList = document.getElementById("planList");
    const searchBox = document.getElementById("searchBox");
    const sortOptions = document.getElementById("sortOptions");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const validityFilter = document.getElementById("validityFilter");
    const dataFilter = document.getElementById("dataFilter");
    const planTypeFilters = document.querySelectorAll(".form-check-input"); // Plan Type checkboxes

    let plans = [];

    // Fetch plans from JSON file
    fetch("/data/db.json")
        .then(response => response.json())
        .then(data => {
            plans = data;
            displayPlans(plans); // Display all plans initially
        });

    // Function to display plans
    function displayPlans(filteredPlans) {
        planList.innerHTML = "";
        if (filteredPlans.length === 0) {
            planList.innerHTML = `<p class="text-center text-muted">No plans found</p>`;
            return;
        }
        filteredPlans.forEach(plan => {
            const card = `
                <div class="col-md-4">
                    <div class="card plan-card">
                        <div class="card-body">
                            <h5 class="plan-price">₹${plan.price}</h5>
                            <ul class="plan-details">
                                <li>${plan.data}</li>
                                <li>${plan.calls}</li>
                                <li>${plan.validity} Days Validity</li>
                            </ul>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" data-plan='${JSON.stringify(plan)}'>Recharge</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            planList.innerHTML += card;
        });

        // Add event listeners to all recharge buttons
        const rechargeButtons = document.querySelectorAll('.btn.btn-primary');
        rechargeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const selectedPlan = JSON.parse(this.getAttribute('data-plan'));  // Get the plan data
                localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));  // Store the selected plan in localStorage
                window.location.href = 'payment.html';  // Redirect to payment page
            });
        });
    }
    // Function to filter and update plans
    function filterAndSortPlans() {
        let filteredPlans = plans;

        // Search Filter
        let searchTerm = searchBox.value.toLowerCase();
        if (searchTerm) {
            filteredPlans = filteredPlans.filter(plan =>
                plan.data.toLowerCase().includes(searchTerm) ||
                plan.calls.toLowerCase().includes(searchTerm)
            );
        }

        // Price Filter
        let maxPrice = parseInt(priceRange.value);
        priceValue.textContent = `Max: ₹${maxPrice}`;
        filteredPlans = filteredPlans.filter(plan => plan.price <= maxPrice);

        // Validity Filter
        let validity = validityFilter.value;
        if (validity !== "all") {
            filteredPlans = filteredPlans.filter(plan => plan.validity == validity);
        }

        // Data Filter
        let data = dataFilter.value;
        if (data !== "all") {
            filteredPlans = filteredPlans.filter(plan => plan.data.startsWith(data));
        }

        // Plan Type Filter
        let selectedTypes = Array.from(planTypeFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (selectedTypes.length > 0) {
            filteredPlans = filteredPlans.filter(plan =>
                selectedTypes.includes(plan.planType) ||
                (plan.isInternational && selectedTypes.includes("international-roaming")) ||
                (plan.isOtt && selectedTypes.includes("ott")) ||
                (plan.isPopular && selectedTypes.includes("popular"))
            );
        }

        // Sorting
        let sortBy = sortOptions.value;
        if (sortBy === "low-to-high") {
            filteredPlans.sort((a, b) => a.price - b.price);
        } else if (sortBy === "high-to-low") {
            filteredPlans.sort((a, b) => b.price - a.price);
        }

        displayPlans(filteredPlans);
    }

    // Event Listeners for Filters and Sorting
    searchBox.addEventListener("input", filterAndSortPlans);
    priceRange.addEventListener("input", filterAndSortPlans);
    validityFilter.addEventListener("change", filterAndSortPlans);
    dataFilter.addEventListener("change", filterAndSortPlans);
    sortOptions.addEventListener("change", filterAndSortPlans);
    planTypeFilters.forEach(checkbox => checkbox.addEventListener("change", filterAndSortPlans));
});
