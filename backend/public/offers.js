document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.getElementById('navbar');
  
  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', function() {
      navbar.classList.toggle('active');
    });
  }

  // Dropdown menu functionality
  const profileToggle = document.getElementById('profileToggle');
  const profileMenu = document.getElementById('profileMenu');
  
  if (profileToggle && profileMenu) {
    profileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!profileToggle.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.style.display = 'none';
      }
    });
  }

  // Mobile dropdown menu behavior
  function handleMobileDropdown() {
    if (window.innerWidth <= 768) {
      // For mobile, make dropdown click to open
      const dropdowns = document.querySelectorAll('.dropdown');
      
      dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && content) {
          dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
          });
        }
      });
    }
  }

  // Run on load and resize
  handleMobileDropdown();
  window.addEventListener('resize', handleMobileDropdown);
});