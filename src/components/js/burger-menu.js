const $togglesMenu = document.querySelectorAll('.toggle-menu');

if ($togglesMenu.length !== 0) {
  $togglesMenu.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const $thisMenu = toggle.closest('.menu');

      $thisMenu.classList.toggle('menu_active');
    });
  });
}