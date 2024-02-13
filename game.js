var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).on("keypress", function(){
    if (!started){
        nextSequence();
        $("h1").text("Level " + level);
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var colorSounds = new Audio("sounds/" + randomChosenColour + ".mp3");
    colorSounds.play();

    level++;

    $("h1").text("Level " + level);
}

$(".btn").on("click", function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var chosenColour = new Audio("sounds/" + name + ".mp3");
    chosenColour.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");

    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentIndex){
    if(gamePattern[currentIndex] === userClickedPattern[currentIndex]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 100);

        $("h1").text("Game Over! Press any key to restart");

        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
