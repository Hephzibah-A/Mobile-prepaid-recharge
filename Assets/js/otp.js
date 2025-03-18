document.getElementById("otpForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let otp = document.getElementById("otp").value;
    let otpError = document.getElementById("otpError");
    let mobileNumber = localStorage.getItem("mobileNumber"); // Retrieve mobile number

    if (!mobileNumber) {
        alert("Session expired. Please log in again.");
        window.location.href = "login.html";
        return;
    }

    if (!/^\d{6}$/.test(otp)) {
        otpError.textContent = "Please enter a valid 6-digit OTP.";
        return;
    }
    otpError.textContent = "";

    try {
        // Call login API with OTP
        const response = await fetch(`http://localhost:8082/api/auth/login?mobileNumber=${mobileNumber}&otp=${otp}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Invalid OTP. Please try again.");

        const data = await response.json();

        // Store tokens in localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        alert("Login successful!");
        window.location.href = "main.html"; // Redirect to dashboard
    } catch (error) {
        alert(error.message);
    }
});
