
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');
let main = document.querySelector('body');
let main2 = document.querySelector('main');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        logo.src = "byui-logo-white.png";
        main.style.backgroundColor = "rgb(59, 59, 59)";
        main.style.color = "white";
        main2.style.border = '1px white solid';
    } else {
        logo.src = "byui-logo-blue.webp";
        main.style.backgroundColor = "white";
        main.style.color = "black";
        main2.style.border = '1px black solid';
    }
}           
                    