/**
 * Functions hoisting
 */

/**
 * Function statement - function could be declared after it invoke
 */
calculateAge(1965);

function calculateAge(year) {
    console.log(2016 - year);
}

/**
 * Function expression - function should be declared before usage
 */
// retirement(1956); - leads to error
var retirement = function (year) {
    console.log(65 - (2016 - year));
}

/**
 * Variables hoisting - leads to undefined value
 */

console.log("********************");

console.log(age);
var age = 23;

function foo() {
    console.log(age);
    var age = 65;
    console.log(age);
}

foo();
console.log(age);

console.log("********************");

/**
 * Scoping
 */

var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}

console.log("********************");

/**
 * Scoping vs Stack execution
 **/
var a = 'Hello!';
firstStack();

function firstStack() {
    var b = 'Hi!';
    secondStack();

    function secondStack() {
        var c = 'Hey!';
        thirdStack()
    }
}

function thirdStack() {
    var d = 'John';
    //console.log(c);
    console.log(a + d);
}

console.log("********************\n");

console.log(this);
calculateAge(1985);
function calculateAge(year) {
    console.log(2016 - year);
    console.log(this);
}
var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2016 - this.yearOfBirth);

        function innerFunction() {
            console.log(this);
        }
        innerFunction();
    }
}
john.calculateAge();
var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};
mike.calculateAge = john.calculateAge;
mike.calculateAge();
