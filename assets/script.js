const gameEl = $("#game");
const questionEl = $("#question");
const answerEl = $("#answers");
const formEl = $("#initials");
const startEl = $("#start");
const scoreboardEl = $("#scoreboard");
const boardEl = $("#board");
const timerEl = $("#time");
let score = 0;
let chosen;
let used = [];
let highScores = [];
let secondsLeft = 60;

//hiding everthing but start screen
formEl.hide();
gameEl.hide();
timerEl.hide();

let questions = [
    {
        question: "what type of variable is either true or false?",
        choiceA : "string",
        choiceB : "interger",
        choiceC : "boolean",
        choiceD : "float",
        correct : "boolean"
    },{
        question: "what type of variable is stuff[]",
        choiceA : "string",
        choiceB : "interger",
        choiceC : "boolean",
        choiceD : "array",
        correct : "array"
    },{
        question: "what type of variable is stuff[]",
        choiceA : "string",
        choiceB : "interger",
        choiceC : "boolean",
        choiceD : "array",
        correct : "array"
    },{
        question: "what type of variable is stuff[]",
        choiceA : "string",
        choiceB : "interger",
        choiceC : "boolean",
        choiceD : "array",
        correct : "array"
    }
]

function genQuestion(){
    //picking what question to show
    const select = Math.floor(Math.random() * questions.length);
    chosen = questions[select];

    //checking if question has been used
    if(used.includes(select) && used.length < 4){
        genQuestion();
    }else if(used.length < 4){
        questionEl.text(chosen.question);
        answerEl.append("<li>" + chosen.choiceA + "</li>");
        answerEl.append("<li>" + chosen.choiceB + "</li>");
        answerEl.append("<li>" + chosen.choiceC + "</li>");
        answerEl.append("<li>" + chosen.choiceD + "</li>");

        //if chosen question was not already used add to used array
        used.push(select);
    }

}

//basic timer that ends game when reaches 0
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.text("Time: " + secondsLeft);
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        endGame();
      }
  
    }, 1000);
  }

//starts game by hiding start screen, showing game screen and timer. generates frist question as well.
function startGame(){
    startEl.hide();
    gameEl.show();
    timerEl.text("Time: " + secondsLeft);

    genQuestion();
    setTime();
    timerEl.show();
}

function endGame(){
    gameEl.hide();
    formEl.show();
    timerEl.hide();
}

startEl.on("click", startGame)

answerEl.on("click", "li", function(event){
    //getting text value from clicked list item
    const target = $(event.target).text();
    console.log(target);

    //checking if answer is correct
    if(target == chosen.correct){
        console.log("you win");
        score += 5;
        console.log(score);

    }else{
        console.log("you lose");
    }

    //checks if all questions have been chosen to either ask another or end game
    if(used.length < 4){
        answerEl.children().remove();
        genQuestion();
    }else{
        endGame();
        //adds remaining time to score if all questions are answered before time runs out.
        score += secondsLeft;
    }
})

//stores high score on form submit
formEl.on("submit", function(event){
    event.preventDefault();

    const name = $("#name").val();
    console.log(name + " " + score);
    
    
})


