function validateForm() {
    let mobile = document.getElementById("mobile").value;
    let mobileError = document.getElementById("mobileError");

    // Basic Mobile Number Validation (You can customize this)
    if (mobile.trim() === "") {
        mobileError.textContent = "Mobile number is required.";
        return false;
    } else if (!/^\d{10}$/.test(mobile)) { // 10-digit number
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
        return false;
    } else {
        mobileError.textContent = ""; // Clear error
    }

    // If validation passes, you can proceed with form submission or OTP logic
    alert("Validation successful! (OTP logic would go here)");
    return true;
}