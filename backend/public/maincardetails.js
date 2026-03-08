function toggleFilter() {
    const sidebar = document.querySelector('.filter-sidebar');
    sidebar.classList.toggle('active');
}

// Menu burger
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.getElementById("navbar");

    menuIcon.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });
    });
  document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function () {
        mainImage.src = this.src;
      });
    });
  });
document.addEventListener('DOMContentLoaded', function () {
  const mainImage = document.getElementById('main-image');
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');

  // Liste des images en JSON (à injecter dynamiquement dans la page)
  const images = window.imageList || [];
  let index = 0;

  function updateImage() {
    if (images.length > 0) {
      mainImage.src = images[index].image_url;
    }
  }

  if (leftBtn && rightBtn && images.length > 0) {
    leftBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      updateImage();
    });

    rightBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      updateImage();
    });
  }
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
                    alert(result.message);
                    // Toggle the form and heart color
                    const heartIcon = form.querySelector('.heart-btn i');
                    if (form.action.includes('removeFavorite')) {
                        // Change to add form
                        form.action = form.action.replace('removeFavorite', 'addFavorite');
                        heartIcon.style.color = '';
                    } else {
                        // Change to remove form
                        form.action = form.action.replace('addFavorite', 'removeFavorite');
                        heartIcon.style.color = 'red';
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
document.addEventListener('DOMContentLoaded', function () {
  const favBtn = document.querySelector('.fav-btn');

  if (favBtn) {
    favBtn.addEventListener('click', async function (e) {
      e.preventDefault();

      const carId = favBtn.closest('.fav').dataset.id;
      const isFav = favBtn.dataset.fav === "true";
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
          favBtn.dataset.fav = (!isFav).toString();
          const icon = favBtn.querySelector("i");
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
// Handle message button click
async function handleMessageClick(userId) {
  if (!userId) {
    // User not logged in, redirect to login
    window.location.href = '/login';
    return;
  }

  try {
    // Check subscription status
    const response = await fetch('/auth/check-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    });
    
    const data = await response.json();
    
    if (data.isSubscribed) {
      // User is subscribed, redirect to chat
      window.location.href = '/chat';
    } else {
      // User not subscribed, redirect to offers
      window.location.href = '/offers';
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
}