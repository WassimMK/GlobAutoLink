document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.getElementById("navbar");

  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", function () {
      navbar.classList.toggle("active");
    });
  }

  // === Initialiser l'autocomplete de la baladiya ===
  function initializeBaladiyaAutocomplete(filteredCommunes) {
    if ($("#baladiya").data('ui-autocomplete')) {
      $("#baladiya").autocomplete("destroy");
    }
    $("#baladiya").autocomplete({
      source: filteredCommunes,
      minLength: 0
    }).focus(function () {
      $(this).autocomplete("search", "");
    });
  }

  // === Charger les communes pour la wilaya sélectionnée ===
  function loadCommunesForWilaya(wilayaId) {
    fetch('/json/communes.json')
      .then(response => response.json())
      .then(communes => {
        const filteredCommunes = communes
          .filter(commune => commune.wilaya_id == wilayaId)
          .map(commune => commune.nom.fr);
        initializeBaladiyaAutocomplete(filteredCommunes);
      })
      .catch(error => console.error('Erreur lors du chargement des Communes :', error));
  }

  // === Initialiser l'autocomplete de wilaya ===
  function initializeWilayaAutocomplete(wilayas) {
    const wilayaNames = wilayas.map(w => w.nom.fr);

    $("#wilaya").autocomplete({
      source: wilayaNames,
      minLength: 0
    }).focus(function () {
      $(this).autocomplete("search", "");
    });

    $("#wilaya").on("autocompleteselect", function (event, ui) {
      const selectedWilayaName = ui.item.value;
      const selectedWilaya = wilayas.find(w => w.nom.fr === selectedWilayaName);

      if (selectedWilaya) {
        loadCommunesForWilaya(selectedWilaya.id);
      }
    });
  }

  // === Charger les wilayas ===
  function loadWilayas() {
    fetch('/json/wilayas.json')
      .then(response => response.json())
      .then(wilayas => {
        initializeWilayaAutocomplete(wilayas);
      })
      .catch(error => console.error('Erreur lors du chargement des Wilayas :', error));
  }

  loadWilayas();
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