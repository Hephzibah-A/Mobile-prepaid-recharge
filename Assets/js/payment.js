document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the selected plan from localStorage
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    const planDetails = document.getElementById('planDetails');
    const paymentAmount = document.getElementById('paymentAmount');
    const paymentAmountUpi = document.getElementById('paymentAmountUpi');
    const paymentAmountNetbanking = document.getElementById('paymentAmountNetbanking');
    const paymentAmountWallet = document.getElementById('paymentAmountWallet');

    // Payment form containers and radio buttons
    const cardForm = document.getElementById('card-form');
    const upiForm = document.getElementById('upi-form');
    const netbankingForm = document.getElementById('netbanking-form');
    const walletForm = document.getElementById('wallet-form');
    const upiRadio = document.getElementById('upi-radio');
    const cardRadio = document.getElementById('card-radio');
    const netbankingRadio = document.getElementById('netbanking-radio');
    const walletRadio = document.getElementById('wallet-radio');
    const editPlanButton = document.getElementById('editPlanButton');

    // Display the selected plan details and set payment amounts
    if (selectedPlan) {
        planDetails.innerHTML = `
            <ul>
                <li><strong>Plan Name:</strong> ${selectedPlan.name ? selectedPlan.name : "Plan " + selectedPlan.id}</li>
                <li><strong>Price:</strong> ₹${selectedPlan.price}</li>
                <li><strong>Data:</strong> ${selectedPlan.data}</li>
                <li><strong>Calls:</strong> ${selectedPlan.calls}</li>
                <li><strong>Validity:</strong> ${selectedPlan.validity} Days</li>
            </ul>
        `;
        paymentAmount.textContent = selectedPlan.price;
        paymentAmountUpi.textContent = selectedPlan.price;
        paymentAmountNetbanking.textContent = selectedPlan.price;
        paymentAmountWallet.textContent = selectedPlan.price;
    } else {
        planDetails.innerHTML = `<p class="text-muted">No plan selected.</p>`;
    }

    // Allow user to edit the plan (redirect to plans page)
    editPlanButton.addEventListener('click', () => {
        window.location.href = 'plans.html';
    });

    // Utility: Hide all payment forms
    function hideAllForms() {
        cardForm.style.display = 'none';
        upiForm.style.display = 'none';
        netbankingForm.style.display = 'none';
        walletForm.style.display = 'none';
    }

    // Payment method radio buttons: toggle forms
    upiRadio.addEventListener('change', () => {
        hideAllForms();
        upiForm.style.display = 'block';
    });
    cardRadio.addEventListener('change', () => {
        hideAllForms();
        cardForm.style.display = 'block';
    });
    netbankingRadio.addEventListener('change', () => {
        hideAllForms();
        netbankingForm.style.display = 'block';
    });
    walletRadio.addEventListener('change', () => {
        hideAllForms();
        walletForm.style.display = 'block';
    });
    // Show Card form by default
    hideAllForms();
    cardForm.style.display = 'block';

    // ======================================================
    // Validation Functions Using <span> Elements for Error Messages
    // ======================================================

    // Validate Card Payment Form
    function validateCardForm() {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiry = document.getElementById('expiry').value;
        const cvc = document.getElementById('cvc').value;
        const cardholder = document.getElementById('cardholder').value;

        const cardNumberError = document.getElementById('cardNumberError');
        const expiryError = document.getElementById('expiryError');
        const cvcError = document.getElementById('cvcError');
        const cardholderError = document.getElementById('cardholderError');

        // Reset error messages
        cardNumberError.textContent = '';
        expiryError.textContent = '';
        cvcError.textContent = '';
        cardholderError.textContent = '';

        let isValid = true;
        // Remove spaces and validate that it's exactly 16 digits
        const sanitizedCardNumber = cardNumber.replace(/\s+/g, '');
        if (!/^\d{16}$/.test(sanitizedCardNumber)) {
            cardNumberError.textContent = 'Please enter a valid 16-digit card number.';
            isValid = false;
        }
        // Validate expiry date in MM/YY format
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.trim())) {
            expiryError.textContent = 'Please enter a valid expiry date in MM/YY format.';
            isValid = false;
        }
        // Validate CVC: exactly 3 digits
        if (!/^\d{3}$/.test(cvc.trim())) {
            cvcError.textContent = 'Please enter a valid 3-digit CVC.';
            isValid = false;
        }
        // Validate cardholder name: only letters and spaces, non-empty
        if (!/^[a-zA-Z\s]+$/.test(cardholder.trim())) {
            cardholderError.textContent = 'Please enter a valid cardholder name.';
            isValid = false;
        }
        return isValid;
    }

    // Validate UPI Payment Form
    function validateUpiForm() {
        const upiId = document.getElementById('upiId').value;
        const upiIdError = document.getElementById('upiIdError');
        upiIdError.textContent = '';
        let isValid = true;
        // Basic check: UPI id must contain an '@'
        if (!/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
            upiIdError.textContent = 'Please enter a valid UPI ID.';
            isValid = false;
        }
        return isValid;
    }

    // Validate NetBanking Payment Form
    function validateNetbankingForm() {
        const bankName = document.getElementById('bankName').value;
        const netbankingId = document.getElementById('netbankingId').value;
        const netbankingPassword = document.getElementById('netbankingPassword').value;

        const bankNameError = document.getElementById('bankNameError');
        const netbankingIdError = document.getElementById('netbankingIdError');
        const netbankingPasswordError = document.getElementById('netbankingPasswordError');

        bankNameError.textContent = '';
        netbankingIdError.textContent = '';
        netbankingPasswordError.textContent = '';

        let isValid = true;
        if (bankName.trim() === '') {
            bankNameError.textContent = 'Bank Name is required.';
            isValid = false;
        }
        if (netbankingId.trim() === '') {
            netbankingIdError.textContent = 'NetBanking ID is required.';
            isValid = false;
        }
        if (netbankingPassword.trim() === '') {
            netbankingPasswordError.textContent = 'Password is required.';
            isValid = false;
        }
        return isValid;
    }

    // Validate Wallet Payment Form
    function validateWalletForm() {
        const walletProvider = document.getElementById('walletProvider').value;
        const walletMobile = document.getElementById('walletMobile').value;
        const walletProviderError = document.getElementById('walletProviderError');
        const walletMobileError = document.getElementById('walletMobileError');

        walletProviderError.textContent = '';
        walletMobileError.textContent = '';

        let isValid = true;
        if (walletProvider.trim() === '') {
            walletProviderError.textContent = 'Wallet Provider is required.';
            isValid = false;
        }
        // Validate mobile number as exactly 10 digits
        if (!/^\d{10}$/.test(walletMobile.trim())) {
            walletMobileError.textContent = 'Please enter a valid 10-digit mobile number.';
            isValid = false;
        }
        return isValid;
    }

    // ======================================================
    // Record Payment and Update User's Payment History
    // ======================================================
    function recordPayment(paymentMethod) {
        // Retrieve mobile number from localStorage (assume it's stored as 'mobileNumber')
        const mobileNumber = localStorage.getItem('mobileNumber');
        if (!mobileNumber) {
            console.error("Mobile number not found in localStorage.");
            return;
        }
        // Create a new payment record using the current date and the plan's price
        const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
        const newPayment = {
            id: Date.now(), // Unique ID using timestamp
            date: currentDate,
            amount: selectedPlan ? selectedPlan.price : 0,
            method: paymentMethod
        };

        // Fetch the user record from JSON Server using the mobile number (assuming 'phnno' field)
        fetch('http://localhost:3000/users?phnno=' + mobileNumber)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(users => {
                if (users.length === 0) {
                    console.error("User not found for mobile number: " + mobileNumber);
                    return;
                }
                let user = users[0];
                // Ensure that the paymentHistory property exists and is an array
                if (!Array.isArray(user.paymentHistory)) {
                    user.paymentHistory = [];
                }
                // Append the new payment record to this user's paymentHistory
                user.paymentHistory.push(newPayment);

                // Update the user record via a PUT request
                fetch('http://localhost:3000/users/' + user.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(updateResponse => {
                        if (!updateResponse.ok) {
                            throw new Error("HTTP error " + updateResponse.status);
                        }
                        return updateResponse.json();
                    })
                    .then(updatedUser => {
                        console.log("Payment recorded successfully for user:", updatedUser);
                        // After successful update, redirect to success page
                        window.location.href = "success.html";
                    })
                    .catch(error => {
                        console.error("Error updating user's payment history:", error);
                    });
            })
            .catch(error => {
                console.error("Error fetching user record:", error);
            });
    }

    // ======================================================
    // Attach Event Listeners to Payment Method Buttons
    // ======================================================

    // Card Payment Button
    document.getElementById('cardPayBtn').addEventListener('click', function (event) {
        event.preventDefault();
        if (validateCardForm()) {
            alert("Card payment successful (placeholder)");
            recordPayment("card");
        }
    });

    // UPI Payment Button
    document.getElementById('upiPayBtn').addEventListener('click', function (event) {
        event.preventDefault();
        if (validateUpiForm()) {
            alert("UPI payment successful (placeholder)");
            recordPayment("upi");
        }
    });

    // NetBanking Payment Button
    document.getElementById('netbankingPayBtn').addEventListener('click', function (event) {
        event.preventDefault();
        if (validateNetbankingForm()) {
            alert("Netbanking payment successful (placeholder)");
            recordPayment("netbanking");
        }
    });

    // Wallet Payment Button
    document.getElementById('walletPayBtn').addEventListener('click', function (event) {
        event.preventDefault();
        if (validateWalletForm()) {
            alert("Wallet payment successful (placeholder)");
            recordPayment("wallet");
        }
    });
});
