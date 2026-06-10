//.forEach() method is used to execute a provided function once for each array element.
const steps = ['one', 'two', 'three', 'four', 'five'];

steps.forEach(showStep);

function showStep(step) {
    console.log(step);
}


//.map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
let myList = document.querySelector('#array-list');

const stepsHtml = steps.map(listTemplate);

function listTemplate(item) {
    return `<li>${item}</li>`;
}

myList.innerHTML = stepsHtml.join('');


let grades = ['A', 'B', 'C'];
let points;

let gpaPoints = grades.map(convert);

function convert(grade) {
    switch (grade){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

console.log(gpaPoints);

//.reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

let totalPoints = gpaPoints.reduce(getTotal);

function getTotal(total, points) {
    return total + points;
}

let gpaAverage = totalPoints / gpaPoints.length;
console.log(gpaAverage);

//.filter method creates a new array with all elements that pass the test implemented by the provided function.

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const filteredWords = words.filter(word => word.length < 6);
console.log(filteredWords);

//,indexOf  returns the first index at which a given element can be found in the array, or -1 if it is not present.
const myArray = [12, 43, 52, 15, 7];
const luckyNumber = 15;
const index = myArray.indexOf(luckyNumber);
console.log(index);

//dynamic content

let container = document.querySelector('#student-container');

const students = [
    {last: 'Andrus', first: 'Aaron'},
    {last: 'Masa', first:'Manny'},
    {last: 'Tanda', first: 'Tamanda'}
];

students.forEach(function(item){
    let name = document.createElement('div');
    name.className = 'format';

    let html = `
        <span>${item.first}</span>
        <span>${item.last}</span>
        <hr>
    `;

    name.innerHTML = html;
    container.appendChild(name);
});