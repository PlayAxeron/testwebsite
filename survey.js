document.addEventListener('DOMContentLoaded', function() {
    const surveyForm = document.getElementById('surveyForm');
    const discordUsernameInput = document.getElementById('discordUsername');
    const biggestChallengeTextarea = document.getElementById('biggestChallenge');
    const workingOnTextarea = document.getElementById('workingOn');

    surveyForm.addEventListener('submit', function(event) {
        let formIsValid = true;

        // Validate Discord Username
        if (discordUsernameInput.value.trim() === '') {
            discordUsernameInput.classList.add('is-invalid');
            formIsValid = false;
        } else {
            discordUsernameInput.classList.remove('is-invalid');
            discordUsernameInput.classList.add('is-valid');
        }

        // Validate Biggest Challenge
        if (biggestChallengeTextarea.value.trim() === '') {
            biggestChallengeTextarea.classList.add('is-invalid');
            formIsValid = false;
        } else {
            biggestChallengeTextarea.classList.remove('is-invalid');
            biggestChallengeTextarea.classList.add('is-valid');
        }

        // Validate Currently Working On
        if (workingOnTextarea.value.trim() === '') {
            workingOnTextarea.classList.add('is-invalid');
            formIsValid = false;
        } else {
            workingOnTextarea.classList.remove('is-invalid');
            workingOnTextarea.classList.add('is-valid');
        }

        if (!formIsValid) {
            event.preventDefault();
            event.stopPropagation();
            surveyForm.classList.add('was-validated');
        } else {
            surveyForm.classList.remove('was-validated');
            // Form will submit to FormSubmit.co and redirect to thank-you.html
        }
    });

    // Real-time validation feedback for Discord Username
    discordUsernameInput.addEventListener('input', function() {
        if (discordUsernameInput.value.trim() !== '') {
            discordUsernameInput.classList.remove('is-invalid');
            discordUsernameInput.classList.add('is-valid');
        } else if (surveyForm.classList.contains('was-validated')) {
            discordUsernameInput.classList.add('is-invalid');
        }
    });

    // Real-time validation feedback for Biggest Challenge
    biggestChallengeTextarea.addEventListener('input', function() {
        if (biggestChallengeTextarea.value.trim() !== '') {
            biggestChallengeTextarea.classList.remove('is-invalid');
            biggestChallengeTextarea.classList.add('is-valid');
        } else if (surveyForm.classList.contains('was-validated')) {
            biggestChallengeTextarea.classList.add('is-invalid');
        }
    });

    // Real-time validation feedback for Currently Working On
    workingOnTextarea.addEventListener('input', function() {
        if (workingOnTextarea.value.trim() !== '') {
            workingOnTextarea.classList.remove('is-invalid');
            workingOnTextarea.classList.add('is-valid');
        } else if (surveyForm.classList.contains('was-validated')) {
            workingOnTextarea.classList.add('is-invalid');
        }
    });
});
