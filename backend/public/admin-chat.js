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

  // === ENVOI AJAX DU MESSAGE (ADMIN) ===
  const form = document.querySelector('#chat-form');
  if (!form) return;

  const inputField = document.querySelector('#messageInput');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const message = inputField.value.trim();
    const chatId = form.querySelector('[name="chatId"]')?.value;

    if (!message || !chatId) {
      console.warn("Message ou Chat ID manquant");
      return;
    }

    try {
      const response = await fetch(`/admin/chats/${chatId}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (data.success) {
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        newMessage.innerHTML = `<p>${message}</p>`;
        messagesContainer.appendChild(newMessage);
        inputField.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } else {
        alert('Erreur serveur : message non envoyé');
      }
    } catch (err) {
      console.error("Erreur AJAX :", err);
    }
  });
});
