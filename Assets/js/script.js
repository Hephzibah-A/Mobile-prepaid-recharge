const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const icon = question.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up'); // Added toggle for up arrow

        question.classList.toggle('collapsed'); // Toggle for styling purposes
        const answer = question.nextElementSibling;
        answer.classList.toggle('show'); // Toggle for showing/hiding answer

    });
});

const form = document.getElementById('contactForm');

form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }

    form.classList.add('was-validated');

    // If the form is valid, you can handle the submission here
    if (form.checkValidity()) {
        // You can use AJAX to send the form data to your server
        // or redirect the user to a thank you page
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
        form.classList.remove('was-validated');
    }
});