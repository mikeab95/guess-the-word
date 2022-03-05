const guessedLettersHTML = document.querySelector(".guessed-letters");

const guessButton = document.querySelector(".guess");

const inputGuess = document.querySelector(".letter");

const wordProgress = document.querySelector(".word-in-progress");

const remaining = document.querySelector(".remaining");

const span = document.querySelector("span");

const message = document.querySelector(".message");

const playAgain = document.querySelector(".play-again");

let word = "magnolia";

const guessedLetters = [];

let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    
    placeholder(word);
};

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

getWord();

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = inputGuess.value;
    //console.log(guess);
    inputGuess.value = "";
    message.innerText = "";
    const goodGuess = validateInput(guess);
    //console.log(goodGuess);
    if (goodGuess) {
        makeGuess(guess);
    }
  });

  const validateInput = function (input) { 
      const acceptedLetter = /[a-zA-Z]/
      if (input.length === 0){
        message.innerText = "Please enter a letter A-Z!";
      } else if (input.length > 1) {
        message.innerText = "Please only enter a single letter!";
      } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only enter a letter, no numbers or special characters!";
      } else {
        return input;
      }
  };

  const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter!";
    } else {
        guessedLetters.push(guess);
        showGuessed();
        guessCount(guess);
        wordProgressUpdate(guessedLetters);
    }
    console.log(guessedLetters);
  };

  const showGuessed = function () {
    guessedLettersHTML.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersHTML.append(li);
    }
  };

  const wordProgressUpdate = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if(guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        };
    }
    wordProgress.innerText = revealWord.join("");
    win();
  };

  const guessCount = function(guess) {
    const wordUpper = word.toUpperCase();
    if(!wordUpper.includes(guess)){
        message.innerText = "Sorry, guess again!";
        remainingGuesses -= 1;
    } else {
        message.innerText = "Great guess!";
    }
    if (remainingGuesses === 0){
        message.innerText = `Game over! You're out of guesses. The word was ${word}`;
        span.innerText = `0 guesses`;
    } else if (remainingGuesses === 1) {
        span.innerText = `1 more guess`;
    } else {
        span.innerText = `${remainingGuesses} guesses`
    }
  };

  const win = function () {
    if (word.toUpperCase() === wordProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
  };

  