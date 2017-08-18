  var userText = document.getElementById("user-text"); // hook userText js variable up to user-text html

  var game = {
  // --
  // Define the properties of your game here, I've defined the first one for you
  // --
  theLetter: null,
  userGuess: null,
  guessArray: [],
  guessTotal: 9,
  guessesLeft: this.guessTotal,  
  gamesToPlay: 3,
  gamesLeft: this.gamesLeft,
  wins: 0,
  loses: 0,
  endOfGame: false,
  endOfSeries: false,
  

  // --
  // Define the functions of your game here
  // Are there any re-usable operations that you can break out into a function so you don't write the same code twice?
  // --
  initialize: function() {
    // Here's a sample function for initializing your game object.  Are there tasks you want to run when the game first starts up?
    // Get ready for new series of games
    console.log("Initializing the Game");
    this.reset();    
    this.wins = 0;
    this.loses = 0;
    console.log("computerLetter: " + this.theLetter);
  },

  reset: function() {
    // Reset the current game - pick a new letter and reset the user-related guessing parameters
    // Here's a sample function for resetting your game.  Are there tasks you want to perform after the user wins/loses?
    console.log("Resetting the Game Properties");
    this.pickLetter();    
    this.userGuess = null;
    this.guessArray = [];
    this.guessTotal = 9;
    this.guessesLeft = this.guessTotal;
    endOfGame = false;
  },

  processGuess: function(guess) {
    // take user guess and add it to the guessArray, decrement guessesLeft, check for end of game
    //var guess;
    this.userGuess = guess;
    this.guessArray.push(guess);
    this.guessesLeft--;

    if (this.userGuess===this.theLetter) {
      this.endOfGame = true;
      this.wins++;
      alert("You WIN!");
    }
    else if (this.guessesLeft=== 0) {
      this.endOfGame = true;
      this.losses++;
      alert("Sorry - you are out of guesses.");
    }
   
    console.log(this);
  },

  updateGame: function() {
    console.log("Updating the game logic.");
    if (gamesToPlay--===0) {
      alert("Games Finished");
    }
    console.log(this);
  },

  showData: function() {
    console.log(this);
  },

  pickLetter: function() {
    // Computer picks a letter between 'a' and 'z'
    console.log("Picking a letter");
    var letterA = 'a';
    //console.log("letterA: " + letterA.charCodeAt(0));
    var randomOffset = Math.floor(Math.random() * 26);
    //console.log("randomOffset: " + randomOffset.toString());
    this.theLetter = String.fromCharCode(letterA.charCodeAt(0) + randomOffset);    
    console.log("theLetter: " + this.theLetter);
  }

  // What other functions does your game have?  What else does your game need to 'do'?
};

// Outside of our game object... our code is loading so let's initialize our game.
game.initialize();

function bodyLoad() {
  //alert("Body Load");
};


// Are there events we need to bind to?  What game functions do we call when the event is fired? Define them here.
document.onkeyup = function(event) {
  userText.textContent = event.key;
  console.log(event);
  console.log(event.key);

  // Process key presses
  switch(event.key) {
  
    // Write some test code to dispatch game object functions for debug
    case("1"):
      game.pickLetter();
      break;     
    case("2"):
      game.initialize();
      break;
    case("3"):
      game.reset();
      break;    
    case("4"):
      game.processGuess(event.key);
      break;    
    case("5"):
      game.updateGame(event.key);
      break;    
    case("6"):
      game.showData(event.key);
      break;

    default:
      game.processGuess(event.key);
      console.log(this);
      break;
  };

  // Call some function on your game object
  //game.updateGameLogic(event.key);

  // Call some function (not on your game object) to update your page elements.  These elements should be updated from properties of your game object
  //updateGameDisplay(); //refresh display
};