document.addEventListener("DOMContentLoaded", function () {
  // === MENU BURGER ===
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.getElementById("navbar");

  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", function () {
      navbar.classList.toggle("active");
    });
  }

  // === BOUTON AFFICHER LES FILTRES (mobile) ===
  const toggleBtn = document.querySelector('.toggle-filters');
  const filterBox = document.querySelector('.filters');

  if (toggleBtn && filterBox) {
    toggleBtn.addEventListener('click', () => {
      filterBox.classList.toggle('show');
      toggleBtn.textContent = filterBox.classList.contains('show') ? ' Hide Filters' : ' Show Filters';
    });
  }

  // === BOUTON CLEAR ALL ===
  const clearBtn = document.getElementById("clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll('.filters select, .filters input').forEach(field => {
        field.value = '';
      });
      window.location.href = '/electric';
    });
  }

  // === TRI (Sort by: ...) ===
  const sortToggle = document.getElementById("sort-toggle");
  const sortDropdown = document.querySelector(".sort-dropdown");
  const sortOptions = document.querySelectorAll(".sort-options div");

  if (sortToggle && sortDropdown && sortOptions.length) {
    sortToggle.addEventListener("click", () => {
      sortDropdown.classList.toggle("show");
    });

    sortOptions.forEach(option => {
      option.addEventListener("click", () => {
        const sortValue = option.getAttribute("data-sort");
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set("sort", sortValue);
        url.search = params.toString();
        window.location.href = url.toString();
      });
    });

    document.addEventListener("click", function (e) {
      if (!sortDropdown.contains(e.target) && !sortToggle.contains(e.target)) {
        sortDropdown.classList.remove("show");
      }
    });

    const sortParam = new URLSearchParams(window.location.search).get("sort");
    if (sortParam) {
      let displayText = "Sort by: ";
      switch (sortParam) {
        case "newest":
          displayText += "Newest";
          break;
        case "oldest":
          displayText += "Oldest";
          break;
        case "priceLow":
          displayText += "Price: Low to High";
          break;
        case "priceHigh":
          displayText += "Price: High to Low";
          break;
        default:
          displayText += "Newest";
      }
      sortToggle.innerHTML = displayText + ' <i class="fa fa-chevron-down"></i>';
    }
  }

  // === MARQUE → MODELE dynamique ===
  const brandModelMap = {
    "Toyota": ["Yaris", "Corolla"],
    "Peugeot": ["208", "2008"],
    "Citroën": ["C3", "C4"],
    "Renault": ["Clio", "Megane", "Logan"],
    "Volkswagen": ["Golf", "Polo"],
    "Hyundai": ["i10", "i20", "i30"],
    "Kia": ["Rio", "Sportage"],
    "Fiat": ["Panda", "500"],
    "Ford": ["Fiesta", "Focus"],
    "Chevrolet": ["Aveo", "Sonic"],
    "Nissan": ["Qashqai"],
    "Mitsubishi": ["Lancer"],
    "Mazda": ["Mazda 3"],
    "Honda": ["Civic"],
    "BMW": ["Serie 1"],
    "Mercedes": ["Classe A"],
    "Audi": ["A3"],
    "Seat": ["Ibiza"],
    "Skoda": ["Octavia"],
    "Opel": ["Astra"],
    "Jeep": ["Compass"],
    "Suzuki": ["Swift"],
    "Chery": ["Tiggo"],
    "Geely": ["Coolray"]
  };

  const brandSelect = document.getElementById("brand");
  const modelSelect = document.getElementById("model");

  if (brandSelect && modelSelect) {
    brandSelect.addEventListener("change", function () {
      const selectedBrand = this.value;
      const models = brandModelMap[selectedBrand] || [];

      modelSelect.innerHTML = '<option value="">Model</option>';
      models.forEach(model => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
      });
    });
  }
});
// === AFFICHER CLEAR ALL SI AU MOINS UN FILTRE EST REMPLI ===
const clearFilters = document.getElementById('clear-filters');
const filterFields = document.querySelectorAll('.filters select, .filters input');

function checkIfFiltersFilled() {
  let hasValue = false;
  filterFields.forEach(field => {
    if (field.value.trim() !== '') {
      hasValue = true;
    }
  });
  if (hasValue) {
    clearFilters.classList.add('show');
  } else {
    clearFilters.classList.remove('show');
  }
}

// Écouteur sur tous les inputs/selects
filterFields.forEach(field => {
  field.addEventListener('input', checkIfFiltersFilled);
  field.addEventListener('change', checkIfFiltersFilled);
});

// Function to handle favorite button click
document.addEventListener('DOMContentLoaded', function() {
    const favForms = document.querySelectorAll('.fav-form');
    
    favForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(new FormData(form))
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Find the parent car card
                    const carCard = form.closest('.car-card');
                    if (carCard) {
                        // Toggle between add and remove forms
                        const newAction = form.action.includes('removeFavorite') ? 
                            form.action.replace('removeFavorite', 'addFavorite') : 
                            form.action.replace('addFavorite', 'removeFavorite');
                        
                        // Update the form
                        form.action = newAction;
                        
                        // Update the heart icon
                        const heartIcon = form.querySelector('.heart-btn i');
                        if (newAction.includes('addFavorite')) {
                            heartIcon.style.color = '';
                        } else {
                            heartIcon.style.color = 'red';
                        }
                    }
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
  const favButtons = document.querySelectorAll('.fav-btn');

  favButtons.forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();

      const favDiv = button.closest('.fav');
      const carId = favDiv.dataset.id;
      const isFav = button.dataset.fav === "true";
      const url = isFav ? "/auth/removeFavorite" : "/auth/addFavorite";

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ car_id: carId })
        });

        const result = await response.json();

        if (result.success) {
          // Mise à jour du bouton et de l’icône
          button.dataset.fav = (!isFav).toString();
          const icon = button.querySelector("i");
          icon.classList.toggle("fas", !isFav);
          icon.classList.toggle("far", isFav);
        } else {
          alert(result.message || "Erreur inconnue");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite.");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("profileToggle");
    const menu = document.getElementById("profileMenu");

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener("click", function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
      }
    });
  });