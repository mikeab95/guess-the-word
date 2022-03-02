//guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
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

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = inputGuess.value;
    console.log(guess);
    inputGuess.value = "";
  });