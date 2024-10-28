// Function to get the current history value displayed
function getHistory(){
    return document.getElementById('history-value').innerText;
}

// Function to display the provided history value
function printHistory(num){
    document.getElementById("history-value").innerText = num;
}

// Function to get the current output value displayed
function getOutput(){
    return document.getElementById("output-value").innerText;
}

// Function to display the formatted output value or clear it if empty
function printOutput(num){
    if(num == ""){
        // Clear the output display
        document.getElementById("output-value").innerText = num;
    } else {
        // Format and display the number if not empty
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    } 
}

// Function to format a number with commas for better readability
function getFormattedNumber(num){
    if(num == "-"){
        return ""; // Return empty if input is a dash
    }
    var n = Number(num);
    var value = n.toLocaleString("en"); // Format number with commas
    return value;
}

// Function to reverse formatted number by removing commas
function reverseNumberFormat(num){
    return Number(num.replace(/,/g, ''));
}

// Add click event listeners to operator buttons
var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++){
    operator[i].addEventListener('click', function(){
        // Clear button functionality
        if(this.id == "clear"){
            printHistory("");
            printOutput("");
        }
        // Backspace functionality to remove the last character in the output
        else if(this.id == "backspace"){
            var output = reverseNumberFormat(getOutput()).toString();
            if(output){
                // Remove the last character in the output and update display
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        }
        // Other operators and calculations
        else{
            var output = getOutput();
            var history = getHistory();

            // If output is empty but history has operators, remove the last operator in history
            if(output == "" && history != ""){
                if(isNaN(history[history.length - 1])){
                    history = history.substr(0, history.length - 1);
                }
            }

            // Continue if there is an output or history value
            if(output != "" || history != ""){
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;

                // If equals sign is clicked, evaluate the expression
                if(this.id == "="){
                    var result = eval(history); // Evaluate history as a JavaScript expression
                    printOutput(result); // Display result
                    printHistory(""); // Clear history after calculation
                }
                // Percentage functionality
                else if(this.id == "%"){
                    var n = reverseNumberFormat(getOutput());
                    var percent = n / 100;
                    printOutput(percent.toFixed(4)); // Show percentage to 4 decimal places
                }
                // For other operators, add the operator to history and clear output
                else{
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

// Add click event listeners to number buttons
var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++){
    number[i].addEventListener('click', function(){
        var output = reverseNumberFormat(getOutput());
        
        // Append clicked number to the output if it's valid
        if(output != NaN){
            output = output + this.id;
            printOutput(output);
        }
    });
}

// Theme toggle event listener to switch between light and dark themes
let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function(){
    if(this.checked){
        // Switch to dark theme by setting a data attribute
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        // Switch to light theme by setting a data attribute
        document.documentElement.setAttribute('data-theme', 'light');
    }
});
