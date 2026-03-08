// document.addEventListener('DOMContentLoaded', function() {
//   const toggleDarkMode = document.getElementById('toggleDarkMode');
//   const body = document.body;

//   // Initialize dark mode from localStorage or system preference
//   function initDarkMode() {
//       const savedMode = localStorage.getItem('darkMode');
//       const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
//       if (savedMode === 'enabled' || (savedMode === null && systemPrefersDark)) {
//           body.classList.add('dark-mode');
//       }
//       updateDarkModeText();
//   }

//   // Update button text based on current mode
//   function updateDarkModeText() {
//       if (body.classList.contains('dark-mode')) {
//           // toggleDarkMode.setAttribute('data-i18n', 'light_mode');
//           toggleDarkMode.innerHTML = '<i class="bx bx-sun"></i> Light Mode';
//       } else {
//           // toggleDarkMode.setAttribute('data-i18n', 'dark_mode');
//           toggleDarkMode.innerHTML = '<i class="bx bx-moon"></i> Dark Mode';
//       }
      
//       if (typeof updateTranslations === 'function') {
//           updateTranslations();
//       }
//   }

//   // Toggle dark mode
//   toggleDarkMode.addEventListener('click', function() {
//       body.classList.toggle('dark-mode');
      
//       if (body.classList.contains('dark-mode')) {
//           localStorage.setItem('darkMode', 'enabled');
//       } else {
//           localStorage.setItem('darkMode', 'disabled');
//       }
      
//       updateDarkModeText();
//   });

//   // Watch for system preference changes
//   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
//       if (localStorage.getItem('darkMode') === null) {
//           if (e.matches) {
//               body.classList.add('dark-mode');
//           } else {
//               body.classList.remove('dark-mode');
//           }
//           updateDarkModeText();
//       }
//   });

//   // Initialize
//   initDarkMode();
// });


// document.addEventListener('DOMContentLoaded', function() {
//   const toggleDarkMode = document.getElementById('toggleDarkMode');
//   const icon = toggleDarkMode.querySelector('i');
//   const body = document.body;

//   // Initialize dark mode
//   function initDarkMode() {
//     const savedMode = localStorage.getItem('darkMode');
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (savedMode === 'enabled' || (savedMode === null && systemPrefersDark)) {
//       body.classList.add('dark-mode');
//     }
//     updateIcon();
//   }

//   // Update icon only
//   function updateIcon() {
//     if (body.classList.contains('dark-mode')) {
//       icon.classList.replace('bx-moon', 'bx-sun');
//     } else {
//       icon.classList.replace('bx-sun', 'bx-moon');
//     }
//   }

//   // Toggle dark mode
//   toggleDarkMode.addEventListener('click', function() {
//     body.classList.toggle('dark-mode');
//     localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
//     updateIcon();
//   });

//   // Watch for system preference changes
//   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
//     if (localStorage.getItem('darkMode') === null) {
//       if (e.matches) {
//         body.classList.add('dark-mode');
//       } else {
//         body.classList.remove('dark-mode');
//       }
//       updateIcon();
//     }
//   });

//   // Initialize
//   initDarkMode();
// });


document.addEventListener('DOMContentLoaded', function() {
  const toggleDarkMode = document.getElementById('toggleDarkMode');
  const icon = toggleDarkMode.querySelector('i');
  const body = document.body;

  // Initialize dark mode
  function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'enabled' || (savedMode === null && systemPrefersDark)) {
      body.classList.add('dark-mode');
    }
    updateIcon();
  }

  // Update icon only
  function updateIcon() {
    if (body.classList.contains('dark-mode')) {
      icon.classList.replace('bx-moon', 'bx-sun');
    } else {
      icon.classList.replace('bx-sun', 'bx-moon');
    }
  }

  // Toggle dark mode
  toggleDarkMode.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    updateIcon();
  });

  // Watch for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('darkMode') === null) {
      if (e.matches) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
      updateIcon();
    }
  });

  // Initialize
  initDarkMode();
});