// Getting starting action for Calculating GIF
document.getElementById("results").style.display = "none";
document.getElementById("calculating").style.display = "none";

// Get the submit element and assign it to a variable
const submitBtn = document.getElementById("loan-form");

// Register EventListener for Submit Button
submitBtn.addEventListener("submit", function(e) {
  // Display Calculating GIF
  document.getElementById("results").style.display = "none";
  document.getElementById("calculating").style.display = "block";

  // A setTimeout to display Calculating GIF
  setTimeout(calculateResults, 1000);

  // A preventDefault
  e.preventDefault();
});

//////////////////////////////
//CAPTURE & CALCULATE
/////////////////////////////

// Function to calculate results
function calculateResults(e) {
  // Setting consts to capture UI user input
  const loanAmountUI = document.getElementById("amount");
  const loanInterestRateUI = document.getElementById("interest");
  const loanYearsUI = document.getElementById("years");

  // Setting consts to display data to UI
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // Calculate Values
  const principal = parseFloat(loanAmountUI.value);
  const calculatedInterest = parseFloat(loanInterestRateUI.value) / 100 / 12;
  const calculatedPayments = parseFloat(loanYearsUI.value) * 12;

  // Compute Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Validate that the value is not infinite
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Display Calculating GIF
    document.getElementById("results").style.display = "block";
    document.getElementById("calculating").style.display = "none";
  } else {
    // Display Calculating GIF
    document.getElementById("results").style.display = "none";
    document.getElementById("calculating").style.display = "none";

    // Display Error Message
    manageError("Error, your interest rate is too high!");
  }
}

//////////////////////////////
//ERROR MESSAGE
/////////////////////////////

// Function to show error message if interest rate is too high
function manageError(errorMsg) {
  // Get Node where the error windows will be displayed
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Create Div to show error
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.id = "customAlert";

  // Create TextNode and append it to the Div
  const errorTextNode = document.createTextNode(errorMsg);
  errorDiv.appendChild(errorTextNode);

  // Insert ErrorMsg above .heading
  card.insertBefore(errorDiv, heading);

  // A setTimeout to clear above error message
  window.setTimeout(clearError, 3000);
}

//////////////////////////////
//CLEAR ERROR MESSAGE
/////////////////////////////

// Function to clear error message after 3 seconds (once it has been generated)
function clearError() {
  document.getElementById("customAlert").remove();
}

//////////////////////////////
//RESET BUTTON
/////////////////////////////

// Get the reset button element and assign it to a variable
const resetBtn = document.getElementById("results");

// Register EventListener for Clear Button
resetBtn.addEventListener("click", function(e) {
  console.log("cleared");
  location.reload();
});
