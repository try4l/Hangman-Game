  var userText = document.getElementById("user-text"); // hook userText js variable up to user-text html

   var countries = {
    c0: ["argentina", "_ _ _ _ _ _ _ _ _ ", "./assets/images/argentina.gif"],
    c1: ["antarctica", "_ _ _ _ _ _ _ _ _ _ ", "./assets/images/antarctica.gif"],
    c2: ["france", "_ _ _ _ _ _ ", "./assets/images/france.gif"],
    c3: ["italy", "_ _ _ _ _ ", "./assets/images/italy.gif"],
    c4: ["spain", "_ _ _ _ _ ", "./assets/images/spain.gif"]
  };

  var countriesArray = [countries.c0, countries.c1, countries.c2, countries.c3, countries.c4];

  var game = {
  // --
  // Define the properties of your game here, I've defined the first one for you
  // --
  
  theCountry: null,
  countryIndex: 0,
  userGuess: null,
  wordArray: [],
  guessTotal: 11,
  guessesLeft: this.guessTotal,
  guesses: [],  
  gamesToPlay: 3,
  gamesLeft: this.gamesToPlay,
  wins: 0,
  losses: 0,
  endOfGame: false,
  endOfSeries: false,
  theFlag: "./assets/images/aland_islands.gif",
  

  // --
  // Define the functions of your game here
  // Are there any re-usable operations that you can break out into a function so you don't write the same code twice?
  // --
  initialize: function() {
    // Here's a sample function for initializing your game object.  Are there tasks you want to run when the game first starts up?
    // Get ready for new series of games
    console.log("Initializing the Game");
    this.reset();
    this.gamesToPlay = 3;
    this.gamesLeft = this.gamesToPlay;    
    this.wins = 0;
    this.losses = 0;
    this.endOfGame = false;
    this.endOfSeries = false;
  },

  reset: function() {
    // Reset the current game - pick a new country and reset the user-related guessing parameters
    // Here's a sample function for resetting your game.  Are there tasks you want to perform after the user wins/loses?
    console.log("Resetting the Game Properties");
    this.pickCountry();    
    this.userGuess = null;
    this.wordArray = countriesArray[this.countryIndex][1];
    this.guesses = [];
    this.guessTotal = 11;
    this.guessesLeft = this.guessTotal;
    this.endOfGame = false;
  },

  processGuess: function(guess) {
    // take user guess and add it to the guessArray, decrement guessesLeft, check for end of game
    this.userGuess = guess;
    this.updateWordArray(guess);
  
    if (this.checkForWin()===true) {
      this.endOfGame = true;
      this.wins++;
      alert("You WIN!");
      this.updateGame();
    }
    else if (this.guessesLeft=== 0) {
      this.endOfGame = true;
      this.losses++;
      alert("Sorry - you are out of guesses.");
      this.updateGame();
    }
   
    console.log(this);
  },

  updateGuesses: function (guess) {
    //  find out if letter has been used already
    for (i=0; i<this.guesses.length; i++) {
      if ((this.guesses[i])===(" " + guess)) {
        return;
      }   
    }
    this.guesses.push(" " + guess);
    this.guessesLeft--;
  },

  updateWordArray: function (guess) {
    var newMatch = false;
    // clone immutable string
    var temp = this.wordArray.split('');
    // replace underbar with current letter where letters match    
    for ( i=0; i<countriesArray[this.countryIndex][0].length; i++) {
      if (this.userGuess===countriesArray[this.countryIndex][0][i]) {
        // replace underbar
        temp[i*2] = guess; 
        newMatch = true;
      }
    }
    this.wordArray = temp.join('');
    this.checkForWin();
    if (newMatch!==true) {
      this.updateGuesses(guess);
    }
  },

  checkForWin: function () {
    for (i=0; i<this.wordArray.length; i++) {
      if (this.wordArray[i]==='_') {
        return false;
      }
    }
    return true;
  },

  updateGame: function() {
    console.log("Updating the game logic.");
    this.gamesLeft--;
    if (this.gamesLeft===0) {
      this.endOfSeries = true;
      this.initialize();
      alert("Games Finished\nPress any key to start again.");
    }
    this.reset();    
  },

  showData: function() {
    console.log(this);
  },

  pickCountry: function() {
    // Computer picks a country at random from the countries array
    console.log("Picking a country");
    var index = Math.floor(Math.random() * countriesArray.length);
    this.countryIndex = index;
    console.log(countriesArray.length);
    console.log("index: " + index);
    this.theCountry = countriesArray[index][0];    
    console.log("theCountry: " + this.theCountry);
    this.theFlag = countriesArray[index][2];
  }

  // What other functions does your game have?  What else does your game need to 'do'?
};

var updateGameDisplay = function (game) {
    var data;

    data = game.gamesLeft;
    document.getElementById("games-left").innerHTML = data;

    data = game.wins;
    document.getElementById("wins").innerHTML = data;

    data = game.losses;
    document.getElementById("losses").innerHTML = data;

    data = game.wordArray;
    document.getElementById("word-array").innerHTML = data;

    data = game.guessesLeft;
    document.getElementById("guesses-left").innerHTML = data;

    data = game.guesses;
    document.getElementById("guesses").innerHTML = data;

    data = game.theFlag;
    document.getElementById("flag").src = data;
};

// Outside of our game object... our code is loading so let's initialize our game.
game.initialize();

function bodyLoad() {
  updateGameDisplay(game);
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
      game.pickCountry();
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
    case("7"):
      game.updateWordArray(event.key);
      break;

    default:
      if ((event.key >= 'a') && (event.key <= 'z')) {
        game.processGuess(event.key);        
      }
      else if ((event.key >= 'A') && (event.key <= 'Z')) {
        game.processGuess(event.key.toLowerCase());
      }
      else {
        alert ("Please enter a letter between 'a' and 'z'");
      }

      console.log(this);
      break;
  };

  // Call some function on your game object
  //game.updateGameLogic(event.key);

  // Call some function (not on your game object) to update your page elements.  These elements should be updated from properties of your game object
  updateGameDisplay(game); //refresh display
};