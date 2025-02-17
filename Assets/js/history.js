document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileContent = document.getElementById('profileContent');
    const editProfileContent = document.getElementById('editProfileContent');
    const editProfileForm = document.getElementById('editProfileForm');

    // Show Edit Profile Form
    editProfileBtn.addEventListener('click', function () {
        profileContent.style.display = 'none';
        editProfileContent.style.display = 'block';
    });

    // Handle Save Changes
    editProfileForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        // Get updated email
        const updatedEmail = document.getElementById('editEmail').value;

        // Update profile with new email
        document.getElementById('userEmail').textContent = updatedEmail;

        // Switch back to profile view
        editProfileContent.style.display = 'none';
        profileContent.style.display = 'block';
    });
});