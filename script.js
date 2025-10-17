"use strict";

// Wait for the document to fully load before running any script
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    toggleButton.textContent = "Switch to Dark Mode";
  } else {
    toggleButton.textContent = "Switch to Light Mode";
  }

  // Add event listener for the theme toggle button
  toggleButton.addEventListener("click", function () {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      toggleButton.textContent = "Switch to Dark Mode";
    } else {
      localStorage.setItem("theme", "dark");
      toggleButton.textContent = "Switch to Light Mode";
    }
  });
});


//Creating the checkGuess function for the game//
function checkGuess() {
  const guessInput = document.getElementById("userGuess");
  const userGuess = parseInt(guessInput.value, 10);
  const guessResult = document.getElementById("guessResult");

  //Ensuring user's guess is a number between 1 - 10
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    guessResult.textContent = "Please enter a valid number between 1 and 10.";
    guessResult.style.color = "red";
    return;
  }

  const randomNumber = Math.floor(Math.random() * 10) + 1; //Generating random number between 1 and 10.


  //Comparing user guess to generated number.
  if (userGuess === randomNumber) {
    guessResult.textContent = `You guessed ${userGuess}. The number was ${randomNumber}. You win!`;
    guessResult.style.color = "green";
  } else {
    guessResult.textContent = `You guessed ${userGuess}. The number was ${randomNumber}. Try again!`;
    guessResult.style.color = "red";
  }
}


// Form validation and handling for contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let hasError = false;

  //Grabbing input fields
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const comments = document.getElementById("comments");

  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  //Validating user input fields
  if (!firstName.value.trim()) {
    document.getElementById("firstNameError").textContent = "First name is required.";
    hasError = true;
  }

  if (!lastName.value.trim()) {
    document.getElementById("lastNameError").textContent = "Last name is required.";
    hasError = true;
  }

  if (!comments.value.trim()) {
    document.getElementById("commentsError").textContent = "Please enter your message.";
    hasError = true;
  }

  //Validating preferred contact method and info
  const contactMethod = document.querySelector('input[name="contactMethod"]:checked')?.value;
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  //Ensuring a valid email is inputted using Regex//
  if (contactMethod === "email" && !/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email.";
    hasError = true;
  }
  //Ensuring a valid phone number is inputted using Regex//
  if (contactMethod === "phone" && !/^\d{10}$/.test(phone)) {
    document.getElementById("phoneError").textContent = "Please enter a 10-digit phone number.";
    hasError = true;
  }

  if (!contactMethod) {
    document.getElementById("contactMethodError").textContent = "Please choose a contact method.";
    hasError = true;
  }

  //Stop form if errors exist
  if (hasError) return;

  //Creating customer object
  const customer = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email,
    phone,
    comments: comments.value.trim(),
    contactMethod
  };

  //Displaying thank you message
  const thankYouMessage = document.getElementById("thankYouMessage");
  thankYouMessage.textContent = `Thank you, ${customer.firstName}! We'll contact you via ${customer.contactMethod}.`;
  thankYouMessage.style.display = "block";

  //Resetting form
  this.reset();
});


