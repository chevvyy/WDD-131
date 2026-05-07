const PI = 3.14;
let radius = 3;

let area = radius * radius * PI;

console.log(area);

radius = 20;
area = radius * radius * PI;

console.log(area);

// type coercion
const one = 1;
const two = 2;

let result = one * two;
console.log(result);

result = one + Number(two);
console.log(result);

// scope
let course = "CSE131"; // global scope

if (true) {
    let student = "John";
    console.log(course);   // works just fine, course is global
    console.log(student);  // works just fine, inside block
}

console.log(course);   // works fine, course is global

let selectElem = document.getElementById('webdevlist');
selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    console.log(codeValue);
})

console.log(codeValue);