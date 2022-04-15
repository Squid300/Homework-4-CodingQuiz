const gameEl = $("#game");
const questionEl = $("#question");
const answerEl = $("#answers");
const formEl = $("#initials");
const startEl = $("#start");
const scoreboardEl = $("#scoreboard");
const boardEl = $("#board");
let score = 0;
let chosen;
let used = [];

//hiding everthing but start screen
formEl.hide();
gameEl.hide();

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

//starts game by hiding start screen, showing game screen and generating frist question
function startGame(){
    startEl.hide();
    gameEl.show();

    genQuestion();
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
        gameEl.hide();
        formEl.show();
    }
})

formEl.on("submit", function(event){
    event.preventDefault();

    const name = $("#name").val();
    console.log(name + " " + score);
    scoreboardEl.append("<li>" + name + " " + score + "</li>");
    localStorage.setItem("score", scoreboardEl);
    
})


