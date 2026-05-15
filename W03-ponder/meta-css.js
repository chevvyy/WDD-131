const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const bars = document.querySelectorAll('.bar1, .bar2, .bar3');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuButton.classList.toggle('change');
});