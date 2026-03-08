const API_URL = "http://localhost:5000"; // Change if deploying online

// Signup
if (document.querySelector("#signup-form")) {
    document.querySelector("#signup-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.querySelector("#signup-name").value;
        const email = document.querySelector("#signup-email").value;
        const password = document.querySelector("#signup-password").value;

        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            window.location.href = "login.html";
        }
    });
}

// Login
if (document.querySelector("#login-form")) {
    document.querySelector("#login-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        alert(data.message);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "profile.html";
        }
    });
}

// Check if Logged In
function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
    }
}

// Logout
if (document.querySelector("#logout-btn")) {
    document.querySelector("#logout-btn").addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "login.html";
    });
}
