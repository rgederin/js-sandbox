//Budget controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1
    };

    Expense.prototype.calculatePercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var budgetData = {
        allItems: {
            expense: [],
            income: []
        },

        totals: {
            expense: 0,
            income: 0
        },

        budget: 0,
        percentage: -1
    };

    var calculateTotal = function (type) {
        var sum = 0;

        if (type === 'inc') {
            budgetData.allItems.income.forEach(function (element) {
                sum += element.value;
            });

            budgetData.totals.income = sum;
        } else {
            budgetData.allItems.expense.forEach(function (element) {
                sum += element.value;
            });

            budgetData.totals.expense = sum;
        }
    };

    return {
        addItemToBudget: function (itemType, itemDescription, itemValue) {
            var newBudgetItem, id;
            id = 0;

            // Create new item based on its type and push in into budget data structure
            if (itemType === "inc") {
                if (budgetData.allItems.income.length > 0) {
                    id = budgetData.allItems.income[budgetData.allItems.income.length - 1].id + 1;
                } else {
                    id = 0;
                }

                newBudgetItem = new Income(id, itemDescription, itemValue);
                budgetData.allItems.income.push(newBudgetItem);
            } else if (itemType === "exp") {
                if (budgetData.allItems.expense.length > 0) {
                    id = budgetData.allItems.expense[budgetData.allItems.expense.length - 1].id + 1;
                } else {
                    id = 0;
                }

                newBudgetItem = new Expense(id, itemDescription, itemValue);
                budgetData.allItems.expense.push(newBudgetItem);
            }

            //Return new budget item
            return newBudgetItem;
        },

        deleteItemFromBudget: function (itemType, itemId) {
            var ids, index;

            if (itemType === "inc") {
                ids = budgetData.allItems.income.map(function (current) {
                    return current.id;
                });

                index = ids.indexOf(itemId);

                if (index !== -1) {
                    budgetData.allItems.income.splice(index, 1);
                }
            } else {
                ids = budgetData.allItems.expense.map(function (current) {
                    return current.id;
                });

                index = ids.indexOf(itemId);

                if (index !== -1) {
                    budgetData.allItems.expense.splice(index, 1);
                }
            }
        },

        calculateBudget: function () {
            //calculate total income and expense
            calculateTotal('inc');
            calculateTotal('exp');

            //calculate budget
            budgetData.budget = budgetData.totals.income - budgetData.totals.expense;

            //calculate percentage of income which we spent
            if (budgetData.totals.income > 0) {
                budgetData.percentage = Math.round((budgetData.totals.expense / budgetData.totals.income) * 100);
            } else {
                budgetData.percentage = -1;
            }
        },

        calculatePercentages: function () {
            budgetData.allItems.expense.forEach(function (element) {
                element.calculatePercentage(budgetData.totals.income);
            });
        },

        getPercentages: function () {
            var allPercenages = budgetData.allItems.expense.map(function (element) {
                return element.getPercentage();
            });

            return allPercenages;
        },

        getBudget: function () {
            return {
                budget: budgetData.budget,
                totalIncome: budgetData.totals.income,
                totalExpense: budgetData.totals.expense,
                percentage: budgetData.percentage
            }
        },
        testing: function () {
            console.log(budgetData);
        }
    }
})();


//UI controller
var uiController = (function () {
    var domStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container",
        expensesPercentageLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    };

    var formatNumber = function (number, type) {
        var numSpit, intPart, decPart, sign;

        number = Math.abs(number);
        number = number.toFixed(2)

        numSpit = number.split(".");

        intPart = numSpit[0];
        decPart = numSpit[1];

        if (intPart.length > 3) {
            intPart = intPart.substr(0, intPart.length - 3) + ","
                + intPart.substr(intPart.length - 3, intPart.length);
        }

        type === "exp" ? sign = "-" : sign = "+";

        return sign + " " + intPart + "." + decPart;
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: parseFloat(document.querySelector(domStrings.inputValue).value)
            }
        },

        addListItem: function (newBudgetItem, type) {
            var rawHtml, preparedHtml, parentElement;

            if (type === "inc") {
                parentElement = domStrings.incomeContainer;
                rawHtml = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
            } else if (type === "exp") {
                parentElement = domStrings.expensesContainer;
                rawHtml = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace to the real text
            preparedHtml = rawHtml.replace("%id%", newBudgetItem.id);
            preparedHtml = preparedHtml.replace("%description%", newBudgetItem.description);
            preparedHtml = preparedHtml.replace("%value%", formatNumber(newBudgetItem.value, type));

            // Insert the HTML into the dom
            document.querySelector(parentElement).insertAdjacentHTML("beforeend", preparedHtml);
        },

        deleteListItem: function (selectorId) {
            document.getElementById(selectorId).parentNode
                .removeChild(document.getElementById(selectorId));
        },

        clearFields: function () {
            var fields, fieldsArray;

            fields = document.querySelectorAll(domStrings.inputDescription + ", " + domStrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (element, index, array) {
                element.value = "";
            });

            fieldsArray[0].focus();
        },

        displayBudget: function (budget) {
            var type;

            budget.budget > 0 ? type = "inc" : type = "exp";

            document.querySelector(domStrings.budgetLabel).textContent = formatNumber(budget.budget, type);
            document.querySelector(domStrings.incomeLabel).textContent = formatNumber(budget.totalIncome, "inc");
            document.querySelector(domStrings.expenseLabel).textContent = formatNumber(budget.totalExpense, "exp");

            if (budget.percentage > 0) {
                document.querySelector(domStrings.percentageLabel).textContent = budget.percentage + "%";
            } else {
                document.querySelector(domStrings.percentageLabel).textContent = "----";

            }

        },

        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(domStrings.expensesPercentageLabel);

            console.log(fields);
            var nodeListForEach = function (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function (element, index) {
                console.log(percentages[index] + " --- " + index);
                if (percentages[index] > 0) {
                    element.textContent = percentages[index] + "%"
                } else {
                    element.textContent = "---"
                }
            });
        },

        displayMonth: function () {
            var now = new Date();

            var year = now.getFullYear();
            var month = now.getMonth();
            document.querySelector(domStrings.dateLabel).textContent = month + " " + year;
        },

        getDomStrings: function () {
            return domStrings;
        }
    };
})();


//APP controller
var appController = (function (budgetController, uiController) {

    var setupEventListeners = function () {
        var dom = uiController.getDomStrings();

        document.querySelector(dom.inputButton).addEventListener("click", addItemToBudgetList)

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                console.log("enter was pressed");
                addItemToBudgetList();
            }
        });

        document.querySelector(dom.container).addEventListener('click', deleteItemFromBudgetList);
    };

    var updateBudget = function () {
        //Calc budget
        budgetController.calculateBudget();

        //Display budget
        var budget = budgetController.getBudget();

        uiController.displayBudget(budget);
    };

    var updatePercentages = function () {
        //1. Calculate percentage
        budgetController.calculatePercentages();

        //2. Read percentages from the budget controller
        var percentages = budgetController.getPercentages();

        //3. Update the UI with the new percentages
        console.log(percentages);
        uiController.displayPercentages(percentages);
    };

    var addItemToBudgetList = function () {
        var inputData, newBudgetItem;

        //Get input data
        inputData = uiController.getInput();

        if (inputData.description !== "" && !isNaN(inputData.value) && inputData.value > 0) {
            //Add item to the budget controller
            newBudgetItem = budgetController.addItemToBudget(inputData.type, inputData.description, inputData.value);

            //Add new item to UI
            uiController.addListItem(newBudgetItem, inputData.type);
            uiController.clearFields();

            //Calculate and update budget
            updateBudget();
            updatePercentages();
        }
    };

    var deleteItemFromBudgetList = function (event) {
        var itemId, splitId, type, id;

        itemId = event.target.parentNode.parentNode
            .parentNode.parentNode.id;

        if (itemId) {
            splitId = itemId.split("-");

            type = splitId[0];
            id = splitId[1];

            // delete item from budget data structure
            budgetController.deleteItemFromBudget(type, parseInt(id));

            // delete item from UI
            uiController.deleteListItem(itemId);

            // update and show new totals (budgets)
            updateBudget();
            updatePercentages();
        }
    };

    return {
        init: function () {
            console.log("Application has started");
            uiController.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                percentage: -1
            });
            setupEventListeners();
            uiController.displayMonth();
        }
    };

})(budgetController, uiController);

appController.init();