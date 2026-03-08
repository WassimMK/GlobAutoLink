// Ajouter une voiture
document.addEventListener("DOMContentLoaded", function() {
    const addCarForm = document.querySelector("#add-car-form");
    if (addCarForm) {
        addCarForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const brand = document.querySelector("#car-brand").value;
            const model = document.querySelector("#car-model").value;
            const year = document.querySelector("#car-year").value;
            const price = document.querySelector("#car-price").value;
            const image = document.querySelector("#car-image").value;
            
            let cars = JSON.parse(localStorage.getItem("cars")) || [];
            cars.push({ brand, model, year, price, image });
            localStorage.setItem("cars", JSON.stringify(cars));

            window.location.href = "my-cars.html"; // Redirection après ajout
        });
    }
});

// Afficher les voitures
function displayCars() {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    const carList = document.querySelector("#car-list");

    if (cars.length === 0) {
        carList.innerHTML = "<p>Aucune voiture ajoutée.</p>";
        return;
    }

    carList.innerHTML = cars.map((car, index) => `
    <li class="my-car-item">
        <img src="${car.image}" alt="${car.model}">
        <div class="car-info">
            <h3>${car.brand} ${car.model}</h3>
            <p>Année : ${car.year}</p>
            <p>Prix : ${car.price}€</p>
            <button onclick="deleteCar(${index})" class="btn-delete">Supprimer</button>
        </div>
    </li>
`).join("");
}

// Supprimer une voiture
function deleteCar(index) {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.splice(index, 1);
    localStorage.setItem("cars", JSON.stringify(cars));
    displayCars();
}
// Sauvegarder les détails de la voiture sélectionnée
function viewCarDetails(index) {
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    localStorage.setItem("selectedCar", JSON.stringify(cars[index]));
    window.location.href = "car-details.html"; 
}

// Charger les détails de la voiture
function loadCarDetails() {
    let car = JSON.parse(localStorage.getItem("selectedCar"));
    if (!car) {
        window.location.href = "my-cars.html"; 
        return;
    }
    
    document.getElementById("car-image").src = car.image;
    document.getElementById("car-title").textContent = car ? `${car.brand} ${car.model}` : "Détails de la voiture";
    document.getElementById("car-year").textContent = `Année : ${car.year}`;
    document.getElementById("car-price").textContent = `Prix : ${car.price}€`;

    document.getElementById("add-favorite").addEventListener("click", function() {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites.push(car);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Ajouté aux favoris !");
    });
}

// Afficher les favoris
function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favList = document.querySelector("#favorites-list");

    if (favorites.length === 0) {
        favList.innerHTML = "<p>Aucun favori ajouté.</p>";
        return;
    }

    favList.innerHTML = favorites.map((car, index) => `
        <li class="my-car-item">
            <img src="${car.image}" alt="${car.model}">
            <div class="car-info">
                <h3>${car.brand} ${car.model}</h3>
                <p>Année : ${car.year}</p>
                <p>Prix : ${car.price}€</p>
                <button onclick="removeFavorite(${index})" class="btn-delete">Supprimer</button>
            </div>
        </li>
    `).join("");
}

// Supprimer une voiture des favoris
function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

// 🔥 Gestion du menu responsive et de la barre de recherche
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    if (navbar.classList.contains('active')) {
        navbar.style.maxHeight = '0px'; 
        setTimeout(() => navbar.classList.remove('active'), 500);
    } else {
        navbar.classList.add('active');
        navbar.style.maxHeight = '300px'; 
    }
};

document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
    }
});
carList.innerHTML = cars.map((car, index) => `
    <li class="my-car-item">
        <img src="${car.image}" alt="${car.model}">
        <div class="car-info">
            <h3>${car.brand} ${car.model}</h3>
            <p>Année : ${car.year}</p>
            <p>Prix : ${car.price}€</p>
            <button onclick="viewCarDetails(${index})" class="btn">Voir Détails</button>
            <button onclick="deleteCar(${index})" class="btn-delete">Supprimer</button>
        </div>
    </li>
`).join("");

