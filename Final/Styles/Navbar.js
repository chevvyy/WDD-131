// Mobile nav menu toggle. On desktop the .menuToggle button is hidden via
// CSS and #navMenu is always shown, so this only matters on small screens.
(function () {
    const toggle = document.getElementById('menuToggleBtn');
    const menu = document.getElementById('navMenu');

    if (!toggle || !menu) return;

    function closeMenu() {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        menu.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menu.classList.contains('open')) {
            closeMenu();
            toggle.focus();
        }
    });

    document.addEventListener('click', function (event) {
        if (menu.classList.contains('open') && !menu.contains(event.target) && event.target !== toggle && !toggle.contains(event.target)) {
            closeMenu();
        }
    });

    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });
})();
