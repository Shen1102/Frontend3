document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const switchForm = document.getElementById("switchForm");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const loginButton = document.getElementById("loginButton");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const usernameLink = document.getElementById("usernameLink");
    const logoutButton = document.getElementById("logoutButton");

    // Function to update form title and hyperlink text
    function updateFormTitle(isLoginForm) {
        if (isLoginForm) {
            document.querySelector(".center h1").textContent = "Log In";
            switchForm.innerHTML = "Don't have an account? <a href='#' id='registerLink'>Register here.</a>";
            forgotPasswordLink.style.display = "block"; // Show forgot password link
        } else {
            document.querySelector(".center h1").textContent = "Register";
            switchForm.innerHTML = "Already have an account? <a href='#' id='loginLink'>Login here.</a>";
            forgotPasswordLink.style.display = "none"; // Hide forgot password link
        }
    }

    // Switch between login and register forms
    switchForm.addEventListener("click", function() {
        if (loginForm.style.display === "none") {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
            updateFormTitle(true); // Update to login form title
        } else {
            loginForm.style.display = "none";
            registerForm.style.display = "block";
            updateFormTitle(false); // Update to register form title
        }
    });

    // Handle Forgot Password Event
    forgotPasswordLink.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link behavior

        const email = prompt("Please enter your email address:");
        if (email) {
            alert("A password reset link has been sent to your email address.");
        }
    });

    // Initialize form title and hyperlink text
    updateFormTitle(true);

    // Handle login form submission
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get login details
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            // Store username in localStorage
            localStorage.setItem("loggedInUser", username);

            alert("Login successful!");

            // Redirect to index.html after successful login
            window.location.href = "home.html";
        } else {
            alert("Invalid username or password.");
        }
    });

    // Handle register form submission
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get register details
        const username = document.getElementById("registerUsername").value;
        const password = document.getElementById("registerPassword").value;

        // Check if user already exists in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            alert("User already exists. Please choose a different username.");
        } else {
            // Add new user to localStorage
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! You can now login.");
            // Switch to login form
            switchForm.click();
        }
    });

    // Check if user is logged in by looking for the username in localStorage
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        loginButton.style.display = "none";
        usernameDisplay.style.display = "block";
        usernameLink.textContent = username;
        logoutButton.style.display = "block";
    }

    // Handle logout
    logoutButton.addEventListener("click", function() {
        // Remove the username from localStorage
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully!");

        // Hide the username and logout button, show the login button
        loginButton.style.display = "block";
        usernameDisplay.style.display = "none";
        logoutButton.style.display = "none";
    });
});
