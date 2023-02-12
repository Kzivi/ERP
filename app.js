const form = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("Username:", username.value);
  console.log("Password:", password.value);
});