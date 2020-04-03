/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers
(each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer.
 The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor
 (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code.
So make sure that all your code is private and doesn't interfere with the other programmers code
(Hint: we learned a special technique to do exactly that).

*/


/*
--- Expert level ---
8. After you display the result, display the next random question,
so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends.
So include the option to quit the game if the user writes 'exit' instead of the answer.
In this case, DON'T call the function from task 8.

*/

(function () {
    var Question = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    };

    var questions = [new Question("Two plus three will be?", ["three", "six", "five"], 2),
        new Question("Five minus three will be?", ["two", "three", "four"], 0),
        new Question("Four multiply five will be?", ["two", "twenty", "five"], 1)];

    Question.prototype.askQuestion = function () {
        console.log("Q: " + this.question);
        console.log("Answers: ");

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ": " + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function (answer) {
        var isCorrect = this.correctAnswer == answer;

        if (isCorrect) {
            console.log("Correct answer!");
        } else {
            console.log("Incorrect answer!");
        }

        if (answer !==  "exit"){
            askNextQuestion();
        }
    };

    function askNextQuestion() {
        var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        randomQuestion.askQuestion();

        var answer = prompt("Please enter answer number");
        randomQuestion.checkAnswer(answer);
    }

    askNextQuestion();
})();



