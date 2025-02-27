document.addEventListener("DOMContentLoaded", function () {
    const mobileNumber = localStorage.getItem('mobileNumber');
    const otpDisplay = document.getElementById("otpDisplay");
    const otpInput = document.getElementById("otp");
    const verificationStatus = document.getElementById("verificationStatus");
    const toast = document.getElementById("toast");

    let storedOTP = null;

    if (!mobileNumber) {
        console.error("Mobile number not found in localStorage.");
        window.location.href = "index.html";
        return;
    }

    fetch('json/otps.json')
        .then(response => response.json())
        .then(otps => {
            storedOTP = otps[mobileNumber];

            if (!storedOTP) {
                console.error("OTP not found for this number.");
                verificationStatus.textContent = "OTP not found for this number.";
                verificationStatus.classList.add("error-message");
            }
        })
        .catch(error => {
            console.error("Error fetching OTP data:", error);
            verificationStatus.textContent = "Error fetching OTP data. Please try again later.";
            verificationStatus.classList.add("error-message");
        });

    window.verifyOTP = function () {
        if (!otpInput) {
            console.error("OTP input field not found.");
            return;
        }

        const enteredOTP = otpInput.value;

        if (enteredOTP === storedOTP) {
            verificationStatus.textContent = "Success! You have been successfully authenticated.";
            verificationStatus.classList.add("success-message");
            verificationStatus.classList.remove("error-message");

            toast.textContent = "Congratulations! You have been successfully authenticated.";
            toast.classList.add("show");

            // Check if the user came from a card payment flow.
            const fromCard = localStorage.getItem('fromCardPayment');
            setTimeout(() => {
                toast.classList.remove("show");

                window.location.href = "main.html";

            }, 3000);
        } else {
            verificationStatus.textContent = "Incorrect OTP. Please try again.";
            verificationStatus.classList.add("error-message");
            verificationStatus.classList.remove("success-message");
        }
    };
});
