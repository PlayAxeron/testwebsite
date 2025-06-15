document.addEventListener('DOMContentLoaded', function() {
    const surveyForm = document.getElementById('surveyForm');
    const userNameInput = document.getElementById('userName');
    const q1Select = document.getElementById('q1');
    const q2Checkboxes = document.querySelectorAll('input[name="Features Important[]"]'); // Corrected name attribute
    const q2CheckboxFeedback = document.querySelector('.checkbox-feedback');

    surveyForm.addEventListener('submit', function(event) {
        // Assume form is valid initially
        let formIsValid = true;

        // --- Validate Name ---
        if (userNameInput.value.trim() === '') {
            userNameInput.classList.add('is-invalid');
            formIsValid = false;
        } else {
            userNameInput.classList.remove('is-invalid');
            userNameInput.classList.add('is-valid');
        }

        // --- Validate Question 1 (Dropdown) ---
        if (q1Select.value === '') {
            q1Select.classList.add('is-invalid');
            formIsValid = false;
        } else {
            q1Select.classList.remove('is-invalid');
            q1Select.classList.add('is-valid');
        }

        // --- Validate Question 2 (Checkboxes) ---
        let atLeastOneChecked = false;
        const q2CheckedCheckboxes = document.querySelectorAll('#surveyForm input[name="Features Important[]"]:checked');
        if (q2CheckedCheckboxes.length > 0) {
            atLeastOneChecked = true;
        }

        if (!atLeastOneChecked) {
            q2CheckboxFeedback.style.display = 'block';
            // Optionally, add a class to trigger visual invalid state on the form group
            document.getElementById('q2_featureA').closest('.mb-3').classList.add('is-invalid-group'); // Custom class
            formIsValid = false;
        } else {
            q2CheckboxFeedback.style.display = 'none';
            document.getElementById('q2_featureA').closest('.mb-3').classList.remove('is-invalid-group');
        }


        // If form is not valid, prevent submission
        if (!formIsValid) {
            event.preventDefault(); // Stop the form from submitting to FormSubmit.co
            event.stopPropagation(); // Stop event propagation
            surveyForm.classList.add('was-validated'); // Add Bootstrap's validation class
        } else {
            // If valid, allow the form to submit naturally
            surveyForm.classList.remove('was-validated'); // Remove validation class
            // The form will now submit to action="https://formsubmit.co/..."
            // FormSubmit.co will handle the redirect to _next page automatically.
        }
    });

    // --- Real-time Validation Feedback ---
    userNameInput.addEventListener('input', function() {
        if (userNameInput.value.trim() !== '') {
            userNameInput.classList.remove('is-invalid');
            userNameInput.classList.add('is-valid');
        } else if (surveyForm.classList.contains('was-validated')) { // Re-add if empty and form already validated
            userNameInput.classList.add('is-invalid');
        }
    });

    q1Select.addEventListener('change', function() {
        if (q1Select.value !== '') {
            q1Select.classList.remove('is-invalid');
            q1Select.classList.add('is-valid');
        } else if (surveyForm.classList.contains('was-validated')) { // Re-add if empty and form already validated
            q1Select.classList.add('is-invalid');
        }
    });

    q2Checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            let atLeastOneChecked = false;
            const currentCheckedCheckboxes = document.querySelectorAll('#surveyForm input[name="Features Important[]"]:checked');
            if (currentCheckedCheckboxes.length > 0) {
                atLeastOneChecked = true;
            }

            if (atLeastOneChecked) {
                q2CheckboxFeedback.style.display = 'none';
                document.getElementById('q2_featureA').closest('.mb-3').classList.remove('is-invalid-group');
            } else {
                if (surveyForm.classList.contains('was-validated')) {
                     q2CheckboxFeedback.style.display = 'block';
                     document.getElementById('q2_featureA').closest('.mb-3').classList.add('is-invalid-group');
                }
            }
        });
    });
});
