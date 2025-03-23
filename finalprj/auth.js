// Vérifier si l'utilisateur est connecté sur la page de profil
function checkAuth() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html"; // Redirige vers login si non connecté
    } else {
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-email").textContent = user.email;
    }
}

// Gestion de l'inscription
if (document.querySelector("#signup-form")) {
    document.querySelector("#signup-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.querySelector("#signup-name").value;
        const email = document.querySelector("#signup-email").value;
        const password = document.querySelector("#signup-password").value;

        // Stocker les infos utilisateur
        localStorage.setItem("user", JSON.stringify({ name, email, password }));
        window.location.href = "profile.html";
    });
}

// Gestion de la connexion
if (document.querySelector("#login-form")) {
    document.querySelector("#login-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === email && user.password === password) {
            window.location.href = "profile.html"; 
        } else {
            alert("Email ou mot de passe incorrect !");
        }
    });
}

// Gestion de la déconnexion
if (document.querySelector("#logout-btn")) {
    document.querySelector("#logout-btn").addEventListener("click", function() {
        localStorage.removeItem("user");
        window.location.href = "login.html"; 
    });
}


let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar'); // Correction ici

// Activer/Désactiver le menu au clic sur l'icône
menuIcon.onclick = () => {
    if (navbar.classList.contains('active')) {
        navbar.style.maxHeight = '0px'; // Réduit la hauteur progressivement
        setTimeout(() => navbar.classList.remove('active'), 500); // Attend la fin de l'animation pour retirer la classe
    } else {
        navbar.classList.add('active');
        navbar.style.maxHeight = '300px'; // Ajuste la hauteur selon le contenu
    }
};


// Fermer le menu si on clique ailleurs sur la page
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
    }
});