let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active'); // Affiche la barre de recherche

    if (search.classList.contains('active')) {
        populateSearchFilters(); // Remplit les filtres de la barre de recherche
    }
 populateSearchBrands(); // Remplit la liste des marques
};

function populateSearchBrands() {
    const brandSelect = document.getElementById("search-brand");
    brandSelect.innerHTML = "<option value=''>Sélectionnez une marque</option>";
    let brands = [...new Set(cars.map(car => car.brand))]; // Supprime les doublons
    brands.forEach(brand => {
        let option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
}

function updateSearchModels() {
    const brand = document.getElementById("search-brand").value;
    const modelSelect = document.getElementById("search-model");
    modelSelect.innerHTML = "<option value=''>Sélectionnez un modèle</option>";

    if (brand) {
        let models = cars.filter(car => car.brand === brand).map(car => car.model);
        models.forEach(model => {
            let option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}

function applySearchFilter() {
    // Récupérer les valeurs de la search-box
    const searchYear = document.getElementById("search-year").value;
    const searchBrand = document.getElementById("search-brand").value;
    const searchModel = document.getElementById("search-model").value;
    const searchMinPrice = document.getElementById("search-minPrice").value;
    const searchMaxPrice = document.getElementById("search-maxPrice").value;

    // Copier ces valeurs dans les filtres de la section du bas
    document.getElementById("year").value = searchYear;
    document.getElementById("brand").value = searchBrand;
    document.getElementById("model").value = searchModel;
    document.getElementById("minPrice").value = searchMinPrice;
    document.getElementById("maxPrice").value = searchMaxPrice;

    // Appliquer le filtrage avec filterCars()
    filterCars();

    // Faire défiler la page jusqu'à la section des résultats
    document.getElementById("car-search").scrollIntoView({ behavior: "smooth" });

    // Fermer la search-box après l'application du filtre
    search.classList.remove("active");
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
        const cars = [
            { brand: "Toyota", model: "Corolla", year: 2020, price: 20000, img: "img/corolla.jpg" },
            { brand: "Toyota", model: "Yaris", year: 2021, price: 18000, img: "img/yaris.jpg" },
            { brand: "BMW", model: "X5", year: 2019, price: 45000, img: "img/x5.avif" },
            { brand: "BMW", model: "M3", year: 2020, price: 55000, img: "img/m3.jpg" },
            { brand: "Mercedes", model: "C-Class", year: 2021, price: 40000, img: "img/cclass.jpg" },
            { brand: "Mercedes", model: "E-Class", year: 2018, price: 38000, img: "img/eclass.jpg" },
            { brand: "Audi", model: "A4", year: 2020, price: 35000, img: "img/a4.jpg" },
            { brand: "Audi", model: "Q7", year: 2021, price: 50000, img: "img/q7.jpg" },
            { brand: "Ford", model: "Focus", year: 2018, price: 15000, img: "img/focus.jpg" },
            { brand: "Ford", model: "Mustang", year: 2022, price: 60000, img: "img/mustang.jpg" }
        ];
        
        // Fonction pour remplir la liste des marques
        function populateBrands() {
            const brandSelect = document.getElementById("brand");
            let brands = [...new Set(cars.map(car => car.brand))]; // Supprime les doublons
            brands.forEach(brand => {
                let option = document.createElement("option");
                option.value = brand;
                option.textContent = brand;
                brandSelect.appendChild(option);
            });
        }
        
        // Fonction pour mettre à jour les modèles en fonction de la marque sélectionnée
        function updateModels() {
            const brand = document.getElementById("brand").value;
            const modelSelect = document.getElementById("model");
            modelSelect.innerHTML = "<option value=''>Sélectionnez un modèle</option>";
        
            if (brand) {
                let models = cars.filter(car => car.brand === brand).map(car => car.model);
                models.forEach(model => {
                    let option = document.createElement("option");
                    option.value = model;
                    option.textContent = model;
                    modelSelect.appendChild(option);
                });
            }
        }
        
        // Fonction de filtrage des voitures
        function filterCars() {
            const currentYear = new Date().getFullYear(); 
            const minYear = currentYear - 3; 
            const year = Math.max(document.getElementById("year").value, minYear);
            const brand = document.getElementById("brand").value;
            const model = document.getElementById("model").value;
            const minPrice = document.getElementById("minPrice").value;
            const maxPrice = document.getElementById("maxPrice").value;
            const carList = document.getElementById("carList");
        
            const filteredCars = cars.filter(car => 
                (year ? car.year == year : true) &&
                (brand ? car.brand == brand : true) &&
                (model ? car.model == model : true) &&
                (minPrice ? car.price >= minPrice : true) &&
                (maxPrice ? car.price <= maxPrice : true)
            );
        
            carList.innerHTML = filteredCars.length 
                ? filteredCars.map(car => `
                    <li class='car-item'>
                        <img src="${car.img}" alt="${car.model}">
                        <div class="car-info">
                            <h3>${car.brand} ${car.model}</h3>
                            <p>Année : ${car.year}</p>
                            <p>Prix : ${car.price}€</p>
                        </div>
                    </li>
                `).join('')
                : "<li>No vehicle found</li>";
        }
        
        // Charger les marques au démarrage
        document.addEventListener("DOMContentLoaded", populateBrands);
        function populateSearchFilters() {
            document.getElementById("search-year").value = document.getElementById("year").value;
            document.getElementById("search-brand").value = document.getElementById("brand").value;
            document.getElementById("search-model").value = document.getElementById("model").value;
            document.getElementById("search-minPrice").value = document.getElementById("minPrice").value;
            document.getElementById("search-maxPrice").value = document.getElementById("maxPrice").value;
        }
        function toggleTheme() {
            let body = document.body;
            let themeButton = document.getElementById("theme-toggle");
        
            // Appliquer ou enlever la classe dark-mode
            body.classList.toggle("dark-mode");
        
            // Sauvegarder le choix de l'utilisateur
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                themeButton.textContent = "☀️ Mode Clair";
            } else {
                localStorage.setItem("theme", "light");
                themeButton.textContent = "🌙 Mode Sombre";
            }
        }
        
        // Appliquer le mode sombre au chargement si nécessaire
        window.onload = function() {
            if (localStorage.getItem("theme") === "dark") {
                document.body.classList.add("dark-mode");
                document.getElementById("theme-toggle").textContent = "☀️ Mode Clair";
            }
        
            checkAlerts(); // Vérifier les alertes
            loadCarOptions(); // Charger les voitures pour la comparaison
        };
        
        // Ajouter l'écouteur d'événement pour le bouton
        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
        });
        function checkAlerts() {
            let alerts = JSON.parse(localStorage.getItem("alerts")) || [];
            let cars = JSON.parse(localStorage.getItem("cars")) || [];
        
            let matches = cars.filter(car => alerts.some(alert => car.brand === alert.brand && car.price <= alert.price));
            
            if (matches.length > 0) {
                alert("Une voiture correspondant à vos critères est disponible !");
            }
        }
        