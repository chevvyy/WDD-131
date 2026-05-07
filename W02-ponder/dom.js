//document.querySelector('#topics').style.color = 'black';

//document.getElementById('topics').style.color = 'blue';

//let list = document.querySelector('.list');

//list.style.border = '3px solid black';


let selectElem = document.getElementById('webdevlist');

selectElem.addEventListener('change', function() {
    let codeValue = selectElem.value;
    console.log(codeValue);

    // Reset all sections first
    document.getElementById('html').style.display = 'none';
    document.getElementById('css').style.display = 'none';
    document.getElementById('js').style.display = 'none';

    // Show only the selected one
    document.getElementById(codeValue).style.display = 'flex';
});