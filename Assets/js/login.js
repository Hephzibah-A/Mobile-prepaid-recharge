document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let mobile = document.getElementById("mobile").value;
    let mobileError = document.getElementById("mobileError");

    if (!/^\d{10}$/.test(mobile)) {
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
        return;
    }
    mobileError.textContent = "";

    // Store the mobile number in localStorage for later use
    localStorage.setItem("mobileNumber", mobile);

    try {
        // Send mobile number to backend to trigger OTP (assuming backend sends OTP)
        const response = await fetch(`http://localhost:8082/api/auth/send-otp?mobileNumber=${mobile}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to send OTP. Please try again.");

        alert("OTP sent successfully!");
        window.location.href = "otp.html"; // Redirect to OTP page
    } catch (error) {
        alert(error.message);
    }
});
