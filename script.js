const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

let word = "";
let topic = "";
let wordBank = {
  Fruits: ["Apple", "Grape", "Banana", "Blueberry", "Strawberry", "Fig", "Pear", "Avocado", "Cherry", "Plum", "Pineapple", "Tangelo", "Watermelon", "Canteloupe", "Lemon", "Lime", "Papaya", "Raspberry", "Apricot", "Blackberry", "Cranberry", "Oranges"],
  Vegetables: ["Carrot", "Potato", "Spinach", "Onion", "Broccoli", "Beet", "Lettuce", "Parsley", "Spinach", "Chives", "Broccoli", "Artichoke", "Garlic", "Celery", "Rhubarb", "Peas", "Eggplant", "Cucumber", "Tomato", "Pepper", "Kale"],
  Desserts: ["Icecream", "Cookie", "Pudding", "Cake", "Popsicle", "Cupcake", "Brownie", "Pie", "Cheesecake", "Cobbler", "Chocolate", "Candy"], 
  Animals: ["Elephant", "Giraffe", "Kangaroo", "Zebra", "Penguin", "Goat", "Parrot", "Tucan", "Pig", "Goose", "Chicken", "Fish", "Monkey", "Rat", "Owl", "Bear", "Gorilla", "Cow", "Dog", "Donkey", "Horse", "Lion", "Deer", "Yak", "Fox", "Raccoon", "Rabbit", "Cat", "Sheep", "Sloth", "Koala", "Wolf", "Coyote", "Jaguar", "Hippopotamus", "Llama", "Alligator", "Crocodile", "Whale", "Dolphin", "Snake", "Squirrel", "Frog", "Toad", "Gopher", "Mole", "Hedgehog", "Otter", "Reindeer", "Porcupine", "Leopard", "Cheetah", "Panda", "Rhinoceros", "Bat"],
  Colors: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet", "Purple", "Pink", "White", "Black"]
};
let guessedLetters = [];
let incorrectGuesses = 0;
const maxGuesses = 6;

// Draw static hangman post
function drawPost() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(50, 200); // base
  ctx.lineTo(150, 200);
  ctx.moveTo(100, 200); // pole
  ctx.lineTo(100, 50);
  ctx.lineTo(180, 50); // top bar
  ctx.lineTo(180, 70); // rope
  ctx.stroke();
}

// Draw hangman parts
function drawHangman(part) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000";
  ctx.beginPath();

  if (part === 1) {
    ctx.arc(180, 90, 20, 0, Math.PI * 2); // head
  } else if (part === 2) {
    ctx.moveTo(180, 110);
    ctx.lineTo(180, 160); // body
  } else if (part === 3) {
    ctx.moveTo(180, 130);
    ctx.lineTo(160, 150); // left arm
  } else if (part === 4) {
    ctx.moveTo(180, 130);
    ctx.lineTo(200, 150); // right arm
  } else if (part === 5) {
    ctx.moveTo(180, 160);
    ctx.lineTo(160, 190); // left leg
  } else if (part === 6) {
    ctx.moveTo(180, 160);
    ctx.lineTo(200, 190); // right leg
  }

  ctx.stroke();
}

// Initialize the game
function startGame(selectedTopic) {
  topic = selectedTopic;
  const words = wordBank[selectedTopic];
  word = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  drawPost(); // draw the post

  document.getElementById("topic").innerText = `Topic: ${selectedTopic}`;
  document.getElementById("wordDisplay").innerText = "_ ".repeat(word.length);
  document.getElementById("message").innerText = "";
}

// Handle guess submission
function submitGuess() {
  const input = document.getElementById("guessInput");
  const guess = input.value.toLowerCase().trim();
  input.value = "";

  if (!guess) return;

  if (guess.length === 1) {
    // Handle single letter guesses
    if (guessedLetters.includes(guess)) {
      document.getElementById("message").innerText = "You already guessed that letter!";
      return;
    }

    guessedLetters.push(guess);
    if (word.includes(guess)) {
      updateWordDisplay();
      if (!document.getElementById("wordDisplay").innerText.includes("_")) {
        document.getElementById("message").innerText = `Congratulations! You correctly guessed the word: ${word}`;
      }
    } else {
      incorrectGuesses++;
      drawHangman(incorrectGuesses);
      if (incorrectGuesses >= maxGuesses) {
        document.getElementById("message").innerText = `Game Over... The word was: ${word}`;
      }
    }
  } else if (guess.length > 1) {
    // Handle full word guesses
    if (guess === word) {
      document.getElementById("wordDisplay").innerText = word.split("").join(" ");
      document.getElementById("message").innerText = `Congratulations! You correctly guessed the word: ${word}`;
    } else {
      incorrectGuesses++;
      drawHangman(incorrectGuesses);
      if (incorrectGuesses >= maxGuesses) {
        document.getElementById("message").innerText = `Game Over... The word was: ${word}`;
      } else {
        document.getElementById("message").innerText = "Incorrect guess. Try again!";
      }
    }
  }
}

// Update word display
function updateWordDisplay() {
  const display = word.split("").map((char) => (guessedLetters.includes(char) ? char : "_")).join(" ");
  document.getElementById("wordDisplay").innerText = display;
}

// Reset game
function resetGame() {
  document.getElementById("topicSelection").style.display = "block";
  document.getElementById("gameContainer").style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Start with topic selection
function selectTopic(topic) {
  document.getElementById("topicSelection").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  startGame(topic);
}
