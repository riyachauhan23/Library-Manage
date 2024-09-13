// Variables for form toggle
var x = document.getElementById("login");
var y = document.getElementById("signup");
var z = document.getElementById("btn");

// Function to show the signup form and hide the login form
function signup() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}

// Function to show the login form and hide the signup form
function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    var userId = document.getElementById('loginUserId').value;
    var password = document.getElementById('loginPassword').value;
    var rememberMe = document.getElementById('rememberMe').checked;

    var storedPassword = localStorage.getItem(userId);

    if (storedPassword === password) {
        alert('Login successful');
        if (rememberMe) {
            localStorage.setItem('rememberMe', userId);
        }
        window.location.href = 'index.html'; // Redirect on successful login
    } else {
        alert('Invalid credentials');
    }
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    var userName = document.getElementById('signupUserName').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var agreeTerms = document.getElementById('agreeTerms').checked;

    if (agreeTerms) {
        localStorage.setItem(userName, password);
        alert('Signup successful');
        login(); // Switch to login form after successful signup
    } else {
        alert('You must agree to the terms & conditions');
    }
}

// Load remembered user ID on page load
function loadRememberedUser() {
    var rememberedUserId = localStorage.getItem('rememberMe');
    if (rememberedUserId) {
        document.getElementById('loginUserId').value = rememberedUserId;
    }
}

// Attach event listeners
window.onload = loadRememberedUser;

// Add event listeners to the forms
document.getElementById('login').addEventListener('submit', handleLogin);
document.getElementById('signup').addEventListener('submit', handleSignup);
