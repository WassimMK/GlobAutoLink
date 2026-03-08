
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const button = e.currentTarget;
      const container = button.closest(".fav");
      const carId = container.dataset.id;
      const isFav = button.dataset.fav === "true";
      const url = isFav ? "/auth/removeFavorite" : "/auth/addFavorite";

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ car_id: carId })
        });

        const data = await res.json();
        if (data.success) {
          button.dataset.fav = (!isFav).toString();
          const icon = button.querySelector("i");
          icon.classList.toggle("fas");
          icon.classList.toggle("far");
        }
      } catch (err) {
        console.error("Erreur AJAX:", err);
        alert("Une erreur est survenue.");
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