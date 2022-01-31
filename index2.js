
let userClickedPattern = []
let buttonColors = ['red', 'green', 'blue', 'yellow']

let gamePattern = [];

function playsound(e) {
    let audio = new Audio(e + ".mp3")
    audio.play();
}

function animationOnClick(action) {
    let currentChosenButton = $("#" + action);
    currentChosenButton.fadeOut(150).fadeIn(150);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


//computer generated sequence
function nextSequence() {
    // random number generation
    randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    // creating a variable to choose random color from the buttonColors array
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);


    for(let i = 0; i< gamePattern.length;i++)
    {

        setTimeout(function() 
        {
            playsound(gamePattern[i])
        animationOnClick(gamePattern[i])
        },i*1000/2 );
    }




    console.log(randomChosenColor);
    level++;
    $(".starting-line").html("level " + level)
}


//user input
$(".our-btn").click(function (event) {
    let userChosenColors = event.target.id;
    userClickedPattern.push(userChosenColors);
    console.log(userClickedPattern);
    CheckAnswer(userClickedPattern.length - 1);
    playsound(userChosenColors)
   animationOnClick(userChosenColors)

})


//starting the game
let level = 0;


function startGame() {

    let gameStarted = false;
    $(".press-it").click(function () {
        if (gameStarted == false) {
            nextSequence();
            gameStarted = true;

        }
    })
}

startGame();
function startOver() {
    level = 0;
    userClickedPattern = [];
    gamePattern = []
    startGame();
}

//checking the answer
function CheckAnswer(currentLevel) {
    let answer = "success"
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        answer = "success"
        console.log(answer)
        // let successSound = new Audio("yellow.mp3")
        // successSound.play();
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = []
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        answer = "fail"
        console.log(answer)

        let failSound = new Audio("wrong.mp3")
        failSound.play();
        $(".starting-line").html("Game over \n click start button to start")
        let body = $("body")
        // body.css("background-color",'red')

        startOver();


    }

}

