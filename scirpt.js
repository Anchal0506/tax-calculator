document.addEventListener("DOMContentLoaded", function () {
  // Function to show tooltip
  function showTooltip(element, text) {
    var tooltip = document.createElement("span");
    tooltip.textContent = text;
    tooltip.className = "tooltip-text";
    tooltip.style.top = element.offsetTop + element.offsetHeight + "px";
    tooltip.style.left = element.offsetLeft + "px";
    document.body.appendChild(tooltip);
  }

  // Function to remove tooltip
  function removeTooltip() {
    var tooltip = document.querySelector(".tooltip-text");
    if (tooltip) {
      tooltip.parentNode.removeChild(tooltip);
    }
  }

  // Initialize tooltips
  var questionMarks = document.querySelectorAll(".question-mark");
  questionMarks.forEach(function (questionMark) {
    questionMark.addEventListener("mouseover", function () {
      var tooltipText = questionMark.getAttribute("data-tooltip");
      showTooltip(questionMark, tooltipText);
    });
    questionMark.addEventListener("mouseout", function () {
      removeTooltip();
    });
  });

  // Function to show error icon
  function showErrorIcon(elementId, errorMessage) {
    var errorIcon = document.getElementById(elementId);
    var errorbox = document.getElementById("error-box");
    errorIcon.style.display = "flex";
    errorIcon.title = errorMessage;
    errorbox.style.display = "flex";
    errorbox.innerText = errorMessage;
  }

  // Function to hide error icon
  function hideErrorIcon(elementId) {
    var errorIcon = document.getElementById(elementId);
    var errorbox = document.getElementById("error-box");
    errorIcon.style.display = "none";
    errorIcon.removeAttribute("title");
    errorbox.style.display = "none";
    errorbox.innerText = "";
  }

  // Function to validate form inputs
  function validateInputs() {
    var isValid = true;
    var inputs = ["grossIncome", "extraIncome", "age", "deductions"];
    inputs.forEach(function (input) {
      var value = document.getElementById(input).value;
      console.log(input,isNaN(value))
      if (value.trim() == "" || isNaN(value)) {
        showErrorIcon(input + "Error", "This field is mandatory and must be a number");
        isValid = false;
        return false
      } else {
        hideErrorIcon(input + "Error");
      }
    });
    return isValid;
  }

  // Function to calculate tax
  function calculateTax() {
    var grossIncome = parseFloat(document.getElementById("grossIncome").value);
    var extraIncome = parseFloat(document.getElementById("extraIncome").value);
    var deductions = parseFloat(document.getElementById("deductions").value);
    var age = parseInt(document.getElementById("age").value);
    console.log(age);
    var taxableIncome =
      parseInt(grossIncome) + parseInt(extraIncome) - parseInt(deductions);
    if (taxableIncome < 0) {
      var errorbox = document.getElementById("error-box");
      errorbox.style.display = "flex";
      errorbox.innerText = "Please correct the applicable deductions";
      return -1;
    }
    var tax = 0;
    console.log(grossIncome, extraIncome, deductions, taxableIncome);
    if (taxableIncome > 800000) {
      if (age < 40) {
        tax = 0.3 * (taxableIncome - 800000);
      } else if (age >= 40 && age < 60) {
        tax = 0.4 * (taxableIncome - 800000);
      } else if (age >= 60) {
        tax = 0.1 * (taxableIncome - 800000);
      }
    }

    return tax; // Format tax to two decimal places
  }

  // Event listener for calculate button click
  var calculateBtn = document.getElementById("calculateBtn");
  calculateBtn.addEventListener("click", function () {
    if (validateInputs()) {
      var tax = calculateTax();
      if (tax >= 0) {
        var resultBody = document.getElementById("resultBody");
        resultBody.innerHTML = "<p>Your Overall Income will be " + tax + "</p>";
        $("#resultModal").modal("show");
      }
    }
  });
});
