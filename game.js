
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$(document).on("keypress", function(){

  if (gameStarted === false) {
    gameStarted = true;
    $("#level-title").text("Press A Key to Start");
    nextSequence();
  }

});

$(".btn").click( function(event) {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playsound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


/*******FUNCTIONS*******/

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);   //Generates random number from 0-3
  var randomChosenColour = buttonColors[randomNumber];  //sets varaiable to random button color
  gamePattern.push(randomChosenColour);     //adds randomChosenColour to array
  $("#"+randomChosenColour).fadeOut(75).fadeIn(75);
  animatePress(randomChosenColour);
  playsound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);

}

function playsound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColor) {

  var buttonPressed = $("#" + currentColor);
  buttonPressed.addClass("pressed");
  setTimeout(function() {
    buttonPressed.removeClass("pressed");
  }, 100);

}


function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Correct");
    console.log(userClickedPattern);
    console.log(gamePattern);

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  setTimeout(function () {
    location.reload();
  }, 3000);
}
