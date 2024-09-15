const resultDisplay = document.getElementById('result');
let currentInput = '';
let previousInput = '';
let operator = null;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const btnText = button.textContent;

        if (btnText === 'AC') {
            // Clear the display and reset all values
            currentInput = '';
            previousInput = '';
            operator = null;
            resultDisplay.textContent = '0';
        } else if (btnText === 'DEL') {
            // Delete the last character from the current input
            currentInput = currentInput.slice(0, -1);
            resultDisplay.textContent = currentInput || '0';
        } else if (btnText === '=') {
            // Calculate the result if an operator exists
            if (operator && previousInput && currentInput) {
                currentInput = evaluate(previousInput, currentInput, operator);
                operator = null;
                previousInput = '';
                resultDisplay.textContent = currentInput;
            }
        } else if (['+', '-', '*', '/', '%'].includes(btnText)) {
            // Handle operator selection
            if (currentInput) {
                operator = btnText;
                previousInput = currentInput;
                currentInput = '';
            }
        } else {
            // Handle number and dot input
            if (btnText === '.' && currentInput.includes('.')) return;
            currentInput += btnText;
            resultDisplay.textContent = currentInput;
        }
    });
});

// Function to perform arithmetic operations
function evaluate(a, b, operator) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    switch (operator) {
        case '+': return (num1 + num2).toString();
        case '-': return (num1 - num2).toString();
        case '*': return (num1 * num2).toString();
        case '/': return (num1 / num2).toString();
        case '%': return (num1 % num2).toString();
        default: return b;
    }
}
