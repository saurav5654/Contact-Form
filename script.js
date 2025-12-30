document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Get all input elements and their corresponding error message divs
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email-address');
    const messageInput = document.getElementById('message');
    const consentCheckbox = document.getElementById('consent');

    const firstNameError = document.getElementById('first-name-error');
    const lastNameError = document.getElementById('last-name-error');
    const emailError = document.getElementById('email-address-error');
    const queryTypeError = document.getElementById('query-type-error');
    const messageError = document.getElementById('message-error');
    const consentError = document.getElementById('consent-error');

    const queryTypeRadios = document.querySelectorAll('input[name="query_type"]');
    const radioGroupDiv = document.querySelector('.radio-group');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        clearErrors(); // Clear previous errors

        let isValid = true;

        // Validate First Name
        if (firstNameInput.value.trim() === '') {
            displayError(firstNameInput, firstNameError, 'This field is required');
            isValid = false;
        }

        // Validate Last Name
        if (lastNameInput.value.trim() === '') {
            displayError(lastNameInput, lastNameError, 'This field is required');
            isValid = false;
        }

        // Validate Email Address
        if (emailInput.value.trim() === '') {
            displayError(emailInput, emailError, 'This field is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Query Type
        let isQueryTypeSelected = Array.from(queryTypeRadios).some(radio => radio.checked);
        if (!isQueryTypeSelected) {
            displayError(radioGroupDiv, queryTypeError, 'Please select a query type');
            radioGroupDiv.classList.add('error'); // Add error class to the radio group div
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            displayError(messageInput, messageError, 'This field is required');
            isValid = false;
        }

        // Validate Consent Checkbox
        if (!consentCheckbox.checked) {
            displayError(consentCheckbox, consentError, 'To submit this form, please consent to be contacted');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission (e.g., via AJAX)
            console.log('Form submitted successfully!');
            form.reset(); // Clear form fields
            successMessage.classList.remove('hidden'); // Show success message
            // Optionally hide success message after a few seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
    });

    function displayError(inputElement, errorElement, message) {
        if (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA') {
            inputElement.classList.add('error');
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.classList.remove('error');
        });
        radioGroupDiv.classList.remove('error'); // Remove error class from radio group
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});