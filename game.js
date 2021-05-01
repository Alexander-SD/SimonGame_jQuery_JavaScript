var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var isGameStarted = false;

var level = 0;

// First launch

$(document).keypress(function () { 
    if (!isGameStarted)
    {
        nextSequence();
        isGameStarted = true;
        $("#level-title").text("Level " + level);
    }
});


function nextSequence() {
    userClickedPattern = [];
    level++;    
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over. Press Any Key to Restart");
        startOver();
    }
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}