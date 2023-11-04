$(document).ready(function() {
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@northeastern\.edu$/;
        return emailRegex.test(email);
    }

    function containsSpecialChars(str) {
        const specialChars = /[^a-zA-Z0-9]+/;
        return specialChars.test(str);
    }

    function displayE(element, message) {
        $(element).show();
        $(element).text(message);
    }

    function hideE(element) {
        $(element).hide();
    }

    let validEmail = false;
        let validUsername=false;
        let validPassword = false;
        let validConfirmPassword = false;

    $('#email, #username, #password, #confirmPassword').on('input', function() {
        const currentField = `#${$(this).attr('id')}`;
        const errorElement = `${currentField}E`;
        hideE(errorElement);

        const emailValue = $('#email').val();
        const usernameValue = $('#username').val();
        const passwordValue = $('#password').val();
        const confirmPasswordValue = $('#confirmPassword').val();
        

        if (currentField === '#email') {
            if (!emailValue) {
                displayE(errorElement, 'Email is required');
            } else if (!validateEmail(emailValue)) {
                displayE(errorElement, 'Invalid email format,use northeastern.edu domain');
            }
            else {
                validEmail=true
            }
        } else if (currentField === '#username') {
            if (!usernameValue) {
                displayE(errorElement, 'Username is required');
            } else if (containsSpecialChars(usernameValue)) {
                displayE(errorElement, 'Special characters error');
            }
            else{
                validUsername=true
            }
        } else if (currentField === '#password') {
            if (!passwordValue) {
                displayE(errorElement, 'Password is required');
            } else if (passwordValue.length < 8 || passwordValue.length > 20) {
                displayE(errorElement, 'Password should be between 8 and 20 characters');
            }
            else{
                validPassword=true
            }
        } else if (currentField === '#confirmPassword') {
            if (passwordValue !== confirmPasswordValue) {
                displayE(errorElement, "Passwords don't match");
                valid = false;
            }
            else{
                validConfirmPassword=true
            }
        }

        if (validEmail && validUsername && validPassword && validConfirmPassword) {
            $('#loginButton').prop('disabled', false);
        } else {
            $('#loginButton').prop('disabled', true);
        }
    });

    $('#loginButton').click(function() {
        const usernameValue = $('#username').val();
        window.location.href = `calculator.html?username=${encodeURIComponent(usernameValue)}`;
    });
});
