let search = document.querySelector('.search-box');
        document.querySelector('#search-icon').onclick = () => {
            search.classList.toggle('active');
        };

        let menuIcon = document.querySelector('#menu-icon');
        let navbar = document.querySelector('#navbar');
        menuIcon.onclick = () => {
            navbar.classList.toggle('active');
        };
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
            const year = document.getElementById("year").value;
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
                : "<li>Aucune voiture trouvée</li>";
        }
        
        // Charger les marques au démarrage
        document.addEventListener("DOMContentLoaded", populateBrands);