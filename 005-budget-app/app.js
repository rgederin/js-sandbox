//Budget controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
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
            expense: [],
            income: []
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
        expensesContainer: ".expenses__list"
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
            }
        },

        addListItem: function (newBudgetItem, type) {
            var rawHtml, preparedHtml, parentElement;

            if (type === "inc") {
                parentElement = domStrings.incomeContainer;
                rawHtml = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
            } else if (type === "exp") {
                parentElement = domStrings.expensesContainer;
                rawHtml = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace to the real text
            preparedHtml = rawHtml.replace("%id%", newBudgetItem.id);
            preparedHtml = preparedHtml.replace("%description%", newBudgetItem.description);
            preparedHtml = preparedHtml.replace("%value%", newBudgetItem.value);

            // Insert the HTML into the dom
            document.querySelector(parentElement).insertAdjacentHTML("beforeend", preparedHtml);
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
    };

    var addItemToBudgetList = function () {
        var inputData, newBudgetItem;

        //Get input data
        inputData = uiController.getInput();

        //Add item to the budget controller
        newBudgetItem = budgetController.addItemToBudget(inputData.type, inputData.description, inputData.value);

        //Add new item to UI
        uiController.addListItem(newBudgetItem, inputData.type);
        uiController.clearFields();
        //Calc budget

        //Display budget
    };

    return {
        init: function () {
            console.log("Application has started");
            setupEventListeners();
        }
    };

})(budgetController, uiController);

appController.init();