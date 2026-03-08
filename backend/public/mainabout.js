document.addEventListener("DOMContentLoaded", function () {
  // === MENU BURGER ===
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.getElementById("navbar");

  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", function () {
      navbar.classList.toggle("active");
    });
  }
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