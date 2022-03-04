//guessed letters
const guessedLettersHTML = document.querySelector(".guessed-letters");
//guess button
const guessButton = document.querySelector(".guess");
//input form
const inputGuess = document.querySelector(".letter");
//guessed word progress paragraph
const wordProgress = document.querySelector(".word-in-progress");
//guesses remaing paragraph
const remaining = document.querySelector(".remaining");
//remaing guesses span
const span = document.querySelector("span");
//messages paragraph
const message = document.querySelector(".message");
//hidden play again button
const playAgain = document.querySelector(".play-again");
//test word
const word = "magnolia";
//guessed letters
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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
      } else if (input.lenght > 1) {
        message.innerText = "Please only enter a single letter!";
      } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only enter a letter, no numbers or special characters!";
      } else {
        message.innerText = "Good job guessing only a single letter!";
        return input;
      }
  };

  const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter!";
    } else {
        guessedLetters.push(guess);
    }
    console.log(guessedLetters);
  };