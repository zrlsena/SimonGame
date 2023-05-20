
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;

// OYUNU BASLATMA FONKSİYONU
$(document).keypress(function() {  
  if (!started) {
    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// KULLANICI BUTON BASMA FONKSİYONU
$(".btn").click(function() {  // Detect when any of the buttons are clicked and trigger a handler function.

  var userChosenColour = $(this).attr("id");  // UserChosenColour store the id of the button that got clicked.
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

//OYUNUN URETTIGI VE KULLANICIN GIRDIGI KAYIT KARSILASTIRMASI
function checkAnswer(currentLevel) {  // Check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
 
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){ // If the user got the most recent answer right , then check that they have finished their sequence with another if statement.
       
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");  // Play sound if the user got one of the answers wrong.
      $("body").addClass("game-over");  // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong
      $("#level-title").text("Game Over, Press Any Key to Restart");  // Change the h1 title, if the user got the answer wrong.

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();  // Call startOver() if the user gets the sequence wrong.
    }
}

//OYUNUN BUTON SIRALASAMASI URETME FONKSIYONU
function nextSequence() {
  userClickedPattern = []; // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++; // Increase the level by 1 every time nextSequence() is called.
  $("#level-title").text("Level " + level);  //Update the h1 with this change in the value of level.
  var randomNumber = Math.floor(Math.random() * 4);  // Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomChosenColour = buttonColours[randomNumber];  // Use the randomNumber  to select a random colour from the buttonColours array.
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//BASILAN BUTON
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");  //pressed class to the button that gets clicked.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//KULLANICININ BASTIGI BUTONA GORE AUDIO AYARLANMASI
function playSound(name) {  
  var audio = new Audio("sounds/" + name + ".mp3");  // Used to play sound in the nextSequence() function
  audio.play();
}

// YANIDEN BASLARKEN LEVEL 0 A ESITLEME VE BASLATMA
function startOver() {  // Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
