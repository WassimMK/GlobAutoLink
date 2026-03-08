document.addEventListener("DOMContentLoaded", function () {
  // === MENU BURGER ===
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.getElementById("navbar");

  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", function () {
      navbar.classList.toggle("active");
    });
  }

  // === TOGGLE PROFIL ===
  const toggle = document.getElementById("profileToggle");
  const menu = document.getElementById("profileMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });

    document.addEventListener("click", function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
      }
    });
  }

  // === AUTO-SCROLL ===
  const messagesContainer = document.querySelector('.chat-messages');
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // === ENVOI MESSAGE EN AJAX ===
  const form = document.getElementById('chat-form');
  const inputField = document.getElementById('messageInput');

  if (form && inputField && messagesContainer) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const message = inputField.value.trim();
      if (!message) return;

      try {
        const response = await fetch('/chat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message })
        });

        const result = await response.json();

        if (result.success) {
          const messageDiv = document.createElement('div');
          messageDiv.className = 'message sent';
          messageDiv.innerHTML = `<p>${result.message}</p>`;
          messagesContainer.appendChild(messageDiv);
          inputField.value = '';
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
          alert(result.error || "Erreur lors de l'envoi.");
        }
      } catch (err) {
        console.error('Erreur AJAX :', err);
        alert("Erreur réseau ou serveur.");
      }
    });
  }
});
