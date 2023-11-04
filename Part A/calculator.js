$(document).ready(function() {
    function containsSpecialCharacters(str) {
        const specialChars = /[^0-9.-]+/;
        return specialChars.test(str);
    }

    const calculate = (operation, num1, num2) => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        if (isNaN(n1) || isNaN(n2)) {
            return 'Invalid input';
        }

        switch (operation) {
            case 'add':
                return n1 + n2;
            case 'subtract':
                return n1 - n2;
            case 'multiply':
                return n1 * n2;
            case 'divide':
                if (n2 === 0) {
                    return 'Division by zero';
                }
                return n1 / n2;
            default:
                return 'Invalid operation';
        }
    }

    function displayResult(result) {
        $('#result').text(result);
    }

    function displayE(element, message) {
        $(element).show();
        $(element).text(message);
    }

    function hideE(element) {
        $(element).hide();
    }

    function enableButtons() {
        const num1 = $('#number1').val();
        const num2 = $('#number2').val();
        const buttons = $('#add, #subtract, #multiply, #divide');
        if (num1 !== '' && num2 !== '' && !containsSpecialCharacters(num1) && !containsSpecialCharacters(num2)) {
            buttons.prop('disabled', false);
        } else {
            buttons.prop('disabled', true);
        }
    }

    $('#number1, #number2').on('input', function() {
        const currentField = `#${$(this).attr('id')}`;
        const errorElement = `${currentField}E`;
        hideE(errorElement);
        enableButtons();
        if (containsSpecialCharacters($(this).val())) {
            displayE(errorElement, 'Number only text field');
        }
    });

    $('#add, #subtract, #multiply, #divide').click(function() {
        const operation = $(this).attr('id');
        const num1 = $('#number1').val();
        const num2 = $('#number2').val();

        const result = calculate(operation, num1, num2);
        displayResult(result);
    });
    function displayUsername() {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        if (username) {
            $('#loggedUser').text(username);
        }
    }

    displayUsername();

    enableButtons();
});
