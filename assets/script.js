const gameEl = $("#game");
const questionEl = $("#question");
const answerEl = $("#answers");
const formEl = $("#score");
const startEl = $("#start");
let score;

//hiding everthing but start screen
formEl.hide();
gameEl.hide();

let questions = [
    {
        question: "what type of variable is a boolean?",
        choiceA : "string",
        choiceB : "interger",
        choiceC : "boolean",
        choiceD : "float",
        correct : "boolean"
    }
]

function genQuestion(){
    //picking what question to show
    const select = questions[Math.floor(Math.random() * questions.length)];

    questionEl.text(select.question);
    answerEl.append("<li>" + select.choiceA + "</li>");
    answerEl.append("<li>" + select.choiceB + "</li>");
    answerEl.append("<li>" + select.choiceC + "</li>");
    answerEl.append("<li>" + select.choiceD + "</li>");
}

//starts game by hiding start screen, showing game screen and generating frist question
function startGame(){
    startEl.hide();
    gameEl.show();

    genQuestion();
}

startEl.on("click", startGame)
answerEl.children().on("click", function(){
    console.log("test");
})


