/*****************************
 * CODING CHALLENGE 1
 */

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true").
*/

var weightMark = 85;
var heightMark = 1.90;

var weightJohn = 78;
var heightJohn = 1.83;

var bmiMark = weightMark / Math.pow(heightMark, 2);
var bmiJohn = weightJohn / Math.pow(heightJohn, 2);

console.log("Mark's BMI: " + bmiMark);
console.log("John's BMI: " + bmiJohn);

var isHigher = bmiMark > bmiJohn;

console.log("Is Mark's BMI higher than John's? " + isHigher);

/*****************************
 * CODING CHALLENGE 2
 */

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points,
while Mike's team scored 116, 94 and 123 points.
1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console.
Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)
4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console.
HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.
*/

var johnAverage = (89 + 120 + 103) / 3;
var mikeAverage = (116 + 94 + 123) / 3;
var winner;

if (johnAverage > mikeAverage) {
    winner = "John";
} else if (mikeAverage > johnAverage) {
    winner = "Mike";
} else {
    winner = "Draw";
}

console.log("Winner is: " + winner);

var mariaAverage = (97 + 134 + 105) / 3;

if (mariaAverage > johnAverage && mariaAverage > mikeAverage) {
    winner = "Maria";
} else if (johnAverage > mariaAverage && johnAverage > mikeAverage) {
    winner = "John";
} else if (mikeAverage > mariaAverage && mikeAverage > johnAverage) {
    winner = "Mike";
}

console.log("Winner is: " + winner);


/*****************************
 * CODING CHALLENGE 3
 */

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.
To tip the waiter a fair amount, John created a simple tip calculator (as a function).
He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200,
and 10% if the bill is more than $200.
In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).
*/

var firstBill = 124;
var secondBill = 48;
var thirdBill = 268;

function calculateTip(billAmount) {
    if (billAmount < 50) {
        return billAmount * 0.2;
    } else if (billAmount > 50 && billAmount < 200) {
        return billAmount * 0.15;
    } else {
        return billAmount * 0.1;
    }
}

var tips = [calculateTip(firstBill), calculateTip(secondBill), calculateTip(thirdBill)];
var billsWithTips = [firstBill + calculateTip(firstBill), secondBill + calculateTip(secondBill), thirdBill + calculateTip(thirdBill)];

console.log("Tips: " + tips);
console.log("Bills with tips: " + billsWithTips);

/*****************************
 * CODING CHALLENGE 4
 */

/*
Let's remember the first coding challenge where Mark and John compared their BMIs.
Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI.
Don't forget they might have the same BMI.
Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).
*/

var john = {
    fullName: 'John',
    weight: 88,
    height: 1.66,
    calculateBmi: function () {
        var bmi = this.weight / Math.pow(this.height, 2);
        this.bmi = bmi;
        return bmi;
    }
};

var mark = {
    fullName: 'Mark',
    weight: 98,
    height: 1.86,
    calculateBmi: function () {
        this.bmi = this.weight / Math.pow(this.height, 2);
        return this.bmi;
    }
};

console.log("John: " + john.fullName + " has BMI = " + john.calculateBmi());
console.log("Mark: " + mark.fullName + " has BMI = " + mark.calculateBmi());

if (john.bmi > mark.bmi) {
    console.log("John's BMI is higher")
} else if (john.bmi < mark.bmi) {
    console.log("Mark's BMI is higher")
} else {
    console.log("draw")
}

/*****************************
 * CODING CHALLENGE 5
 */

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!
This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create
1) a new array containing all tips,
2) an array containing final paid amounts (bill + tip).
HINT: Start with two empty arrays [] as properties and then fill them up in the loop.

EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).
5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips.
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average
*/

var johnRestaurants = {
    bills: [124, 48, 268, 180, 42],
    tips: [],
    billsWithTips: [],
    calculateTip: function (billAmount) {
        if (billAmount < 50) {
            return billAmount * 0.2;
        } else if (billAmount > 50 && billAmount < 200) {
            return billAmount * 0.15;
        } else {
            return billAmount * 0.1;
        }
    },

    calculateTips: function () {
        for (var i = 0; i < this.bills.length; i++) {
            this.tips[i] = this.calculateTip(this.bills[i]);
            this.billsWithTips[i] = this.bills[i] + this.calculateTip(this.bills[i])
        }
    }
}

johnRestaurants.calculateTips();

console.log("John bills: " + johnRestaurants.bills);
console.log("John tips: " + johnRestaurants.tips);
console.log("John bills with tips: " + johnRestaurants.billsWithTips);

var markRestaurants = {
    bills: [77, 375, 110, 45],
    tips: [],
    billsWithTips: [],

    calculateTip: function (billAmount) {
        if (billAmount < 100) {
            return billAmount * 0.2;
        } else if (billAmount > 100 && billAmount < 300) {
            return billAmount * 0.1;
        } else {
            return billAmount * 0.3;
        }
    },

    calculateTips: function () {
        for (var i = 0; i < this.bills.length; i++) {
            this.tips[i] = this.calculateTip(this.bills[i]);
            this.billsWithTips[i] = this.bills[i] + this.calculateTip(this.bills[i])
        }
    }
}

markRestaurants.calculateTips();

console.log("Mark bills: " + markRestaurants.bills);
console.log("Mark tips: " + markRestaurants.tips);
console.log("Mark bills with tips: " + markRestaurants.billsWithTips);

function averageTips(tips) {
    var sumOfTips = 0;

    for (var i = 0; i < tips.length; i++){
        sumOfTips += tips[i];
    }

    return sumOfTips/tips.length;
}

console.log("Average John tips: " + averageTips(johnRestaurants.tips));
console.log("Average Mark tips: " + averageTips(markRestaurants.tips));