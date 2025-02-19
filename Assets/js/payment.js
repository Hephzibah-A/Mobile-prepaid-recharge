document.addEventListener("DOMContentLoaded", function () {
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    const planDetails = document.getElementById('planDetails');
    const paymentAmount = document.getElementById('paymentAmount');
    const paymentAmountUpi = document.getElementById('paymentAmountUpi');
    const paymentAmountNetbanking = document.getElementById('paymentAmountNetbanking');
    const paymentAmountWallet = document.getElementById('paymentAmountWallet');
    const cardForm = document.getElementById('card-form');
    const upiForm = document.getElementById('upi-form');
    const netbankingForm = document.getElementById('netbanking-form');
    const walletForm = document.getElementById('wallet-form');
    const upiRadio = document.getElementById('upi-radio');
    const cardRadio = document.getElementById('card-radio');
    const netbankingRadio = document.getElementById('netbanking-radio');
    const walletRadio = document.getElementById('wallet-radio');
    const editPlanButton = document.getElementById('editPlanButton');

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

    editPlanButton.addEventListener('click', () => {
        window.location.href = 'plans.html';
    });

    function hideAllForms() {
        cardForm.style.display = 'none';
        upiForm.style.display = 'none';
        netbankingForm.style.display = 'none';
        walletForm.style.display = 'none';
    }

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

    hideAllForms();
    cardForm.style.display = 'block';

    function validateCardForm() {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiry = document.getElementById('expiry').value;
        const cvc = document.getElementById('cvc').value;
        const cardholder = document.getElementById('cardholder').value;

        const cardNumberError = document.getElementById('cardNumberError');
        const expiryError = document.getElementById('expiryError');
        const cvcError = document.getElementById('cvcError');
        const cardholderError = document.getElementById('cardholderError');

        cardNumberError.textContent = '';
        expiryError.textContent = '';
        cvcError.textContent = '';
        cardholderError.textContent = '';

        let isValid = true;

        if (cardNumber.trim() === '') {
            cardNumberError.textContent = 'Card number is required.';
            isValid = false;
        }
        if (expiry.trim() === '') {
            expiryError.textContent = 'Expiry date is required.';
            isValid = false;
        }
        if (cvc.trim() === '') {
            cvcError.textContent = 'CVC is required.';
            isValid = false;
        }
        if (cardholder.trim() === '') {
            cardholderError.textContent = 'Cardholder name is required.';
            isValid = false;
        }
        return isValid;
    }

    function validateUpiForm() {
        const upiId = document.getElementById('upiId').value;
        const upiIdError = document.getElementById('upiIdError');
        upiIdError.textContent = '';
        let isValid = true;
        if (upiId.trim() === '') {
            upiIdError.textContent = 'UPI ID is required.';
            isValid = false;
        }
        return isValid;
    }

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
        if (walletMobile.trim() === '') {
            walletMobileError.textContent = 'Mobile Number is required.';
            isValid = false;
        }
        return isValid;
    }

    const cardFormElement = document.getElementById('card-form');
    cardFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateCardForm()) {
            alert("Card payment successful (placeholder)");
        }
    });

    const upiFormElement = document.getElementById('upi-form');
    upiFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateUpiForm()) {
            alert("UPI payment successful (placeholder)");
        }
    });

    const netbankingFormElement = document.getElementById('netbanking-form');
    netbankingFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateNetbankingForm()) {
            alert("Netbanking payment successful (placeholder)");
        }
    });

    const walletFormElement = document.getElementById('wallet-form');
    walletFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateWalletForm()) {
            alert("Wallet payment successful (placeholder)");
        }
    });
});
