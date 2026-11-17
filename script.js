// Retrieve form and input elements from the DOM
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const result = document.getElementById("result");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error"; // Set error class
  const small = formControl.querySelector("small");
  small.innerText = message; // Display error message
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success"; // Set success class
}

// Check if email is valid using regex
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Test the trimmed value of the input against the regex
  if (re.test(input.value.trim())) {
    showSuccess(input); // Call function to indicate valid email
  } else {
    showError(input, "Email is not valid"); // Call function to indicate invalid email
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `Password confirmation is required`); // Field is empty
    } else {
      showSuccess(input); // Field is filled
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Password must be at least ${min} characters`); // Length error - too short
  } else if (input.value.length > max) {
    showError(input, `Password must be less than ${max} characters`); // Length error - too long
  } else {
    showSuccess(input); // Valid length
  }
}

// Check if passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match"); // Password mismatch error
  }
}

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  // Validate inputs
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkEmail(email);
  checkLength(password, 6, 25);
  checkPasswordsMatch(password, password2);

  // Check if all fields are valid
  if (document.querySelectorAll(".form-control.success").length === 4) {
    window.location.href = "#resultScroll"; // scroll to see results
    result.innerHTML = `
    <div class="submitted-data">
      <p class="data-sent title">Submitted data:</p>
      <p class="data-sent">username: ${username.value}</p>
      <p class="data-sent">email: ${email.value}</p>
      <p class="data-sent">password: ${password.value}</p>
    </div>`;

    // Reset form fields
    form.reset();
    const inputs = [username, email, password, password2];
    inputs.forEach((input) => {
      const formControl = input.parentElement;
      formControl.className = "form-control"; // Reset class
    });

    // Clear result on input click
    inputs.forEach((input) => {
      input.addEventListener("click", function () {
        result.innerHTML = ""; // Clear result
      });
    });
  }
});

// COPYRIGHT NOTICE
// Dynamically generate copyright information
const copyright = document.getElementById("copy");
copyright.innerHTML =
  "Copyright &copy; " + // Start of the copyright string
  new Date().getFullYear() + // Get the current year
  ` <a href="https://www.gaz41.com">gaz41.com</a>. <span class="copy2">All Rights Reserved</span>`;

/*
REGEX INFO:
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
^: Asserts the start of the string.
(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")):  Matches the local part of the email:
[^<>()\[\]\\.,;:\s@"]+: Matches one or more characters that are not special characters or whitespace.
(\.[^<>()\[\]\\.,;:\s@"]+)*: Allows for dots followed by valid characters, enabling formats like first.last.
|(".+"): Alternatively, allows for quoted strings (e.g., "john.doe").
@: Matches the '@' symbol, which separates the local part from the domain.
((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})): Matches the domain:
(\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]): Matches an IP address in brackets.
|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}): Matches a standard domain name, allowing for subdomains and ensuring the top-level domain is at least two characters long.
$: Asserts the end of the string.
*/
