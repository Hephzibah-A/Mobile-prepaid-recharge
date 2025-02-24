document.addEventListener("DOMContentLoaded", function () {
    const planList = document.getElementById("planList");
    const searchBox = document.getElementById("searchBox");
    const sortOptions = document.getElementById("sortOptions");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const validityFilter = document.getElementById("validityFilter");
    const dataFilter = document.getElementById("dataFilter");
    const planTypeFilters = document.querySelectorAll(".form-check-input");
    let plans = [];
    fetch("/data/db.json")
        .then(response => response.json())
        .then(data => {
            plans = data.plans;
            displayPlans(plans);
        })
        .catch(error => console.error("Error fetching plans:", error));
    function isNewPlan(addedOn) {
        if (!addedOn) return false;
        const createdDate = new Date(addedOn);
        const today = new Date();
        const differenceInDays = (today - createdDate) / (1000 * 60 * 60 * 24);
        return differenceInDays <= 7;
    }
    function displayPlans(filteredPlans) {
        planList.innerHTML = "";
        if (filteredPlans.length === 0) {
            planList.innerHTML = `<p class="text-center text-muted">No plans found</p>`;
            return;
        }
        const fragment = document.createDocumentFragment();
        filteredPlans.forEach(plan => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            const newBadge = isNewPlan(plan.addedOn) ? `<span class="badge bg-success ms-2">New</span>` : "";
            card.innerHTML = `
                <div class="card plan-card">
                    <div class="card-body">
                        <h5 class="plan-price">₹${plan.price} ${newBadge}</h5>
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
            `;
            fragment.appendChild(card);
        });
        planList.appendChild(fragment);
        document.querySelectorAll(".btn.btn-primary").forEach(button => {
            button.addEventListener("click", function () {
                const selectedPlan = JSON.parse(this.getAttribute("data-plan"));
                localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
                window.location.href = "payment.html";
            });
        });
    }
    function filterAndSortPlans() {
        let filteredPlans = [...plans];
        const searchTerm = searchBox.value.trim().toLowerCase();
        if (searchTerm) {
            filteredPlans = filteredPlans.filter(plan =>
                plan.data.toLowerCase().includes(searchTerm) ||
                plan.calls.toLowerCase().includes(searchTerm)
            );
        }
        const maxPrice = parseInt(priceRange.value, 10);
        priceValue.textContent = `Max: ₹${maxPrice}`;
        filteredPlans = filteredPlans.filter(plan => plan.price <= maxPrice);
        const validity = validityFilter.value;
        if (validity !== "all") {
            filteredPlans = filteredPlans.filter(plan => plan.validity == validity);
        }
        const data = dataFilter.value;
        if (data !== "all") {
            filteredPlans = filteredPlans.filter(plan => plan.data.startsWith(data));
        }
        const selectedTypes = Array.from(planTypeFilters)
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
        switch (sortOptions.value) {
            case "low-to-high":
                filteredPlans.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                filteredPlans.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        displayPlans(filteredPlans);
    }
    [searchBox, priceRange, validityFilter, dataFilter, sortOptions].forEach(input =>
        input.addEventListener("input", filterAndSortPlans)
    );
    planTypeFilters.forEach(checkbox => checkbox.addEventListener("change", filterAndSortPlans));
});
