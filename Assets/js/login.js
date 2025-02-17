function validateForm() {
    let mobile = document.getElementById("mobile").value;
    let mobileError = document.getElementById("mobileError");

    if (mobile.trim() === "") {
        mobileError.textContent = "Mobile number is required.";
        return false;
    } else if (!/^\d{10}$/.test(mobile)) {
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
        return false;
    } else {
        mobileError.textContent = "";
    }

    // Store the mobile number in localStorage (more secure than URL parameters for this step)
    localStorage.setItem('mobileNumber', mobile);

    window.location.href = "otp.html"; // Redirect without the parameter in the URL
    return true;
}