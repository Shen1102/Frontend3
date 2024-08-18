document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterForm = document.getElementById('showRegisterForm');
    const showLoginForm = document.getElementById('showLoginForm');

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const storedPassword = localStorage.getItem(`${username}_password`);

        if (storedPassword == password) {
            localStorage.setItem('currentUser', username);
            window.location = 'home.html';
        } else {
            alert('Invalid username or password!');
            loginForm.reset();
        }
    });

    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();

        if (localStorage.getItem(`${username}_password`)) {
            alert('Username already exists! Please choose a different one.');
            registerForm.reset();
        } else {
            localStorage.setItem(`${username}_password`, password);
            alert('Registration successful! You can now log in.');
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        }
    });

    showRegisterForm.addEventListener('click', event => {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLoginForm.addEventListener('click', event => {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});
