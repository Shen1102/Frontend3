document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const usernameLink = document.getElementById("usernameLink");
    const logoutButton = document.getElementById("logoutButton");

    // Initial state setup
    function updateUI() {
        const username = localStorage.getItem("currentUser");

        if (username) {
            loginButton.style.display = "none";
            usernameDisplay.style.display = "block";
            usernameLink.textContent = username;

            if (logoutButton) {
                logoutButton.style.display = "block";
            }
        } else {
            loginButton.style.display = "block";
            usernameDisplay.style.display = "none";

            if (logoutButton) {
                logoutButton.style.display = "none";
            }
        }
    }

    // Call updateUI to set the initial state
    updateUI();

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            // Remove the username from localStorage
            localStorage.removeItem("currentUser");
            alert("Logged out successfully!");

            // Update UI after logout
            updateUI();
        });
    }
});
