const words = ["apple", "banana", "cherry", "grapes", "orange", "mango"];
let chosenWord = "";
let guessedLetters = [];
let turnsLeft = 6;

function chooseWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    let display = chosenWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
    document.getElementById("word-display").innerText = display;
}

function makeGuess() {
    let input = document.getElementById("guess-input").value.toLowerCase();
    document.getElementById("guess-input").value = "";

    if (!input || guessedLetters.includes(input) || input.length !== 1) {
        document.getElementById("message").innerText = "Invalid guess!";
        return;
    }

    guessedLetters.push(input);

    if (!chosenWord.includes(input)) {
        turnsLeft--;
    }

    document.getElementById("turns").innerText = turnsLeft;
    displayWord();

    if (!document.getElementById("word-display").innerText.includes("_")) {
        document.getElementById("message").innerText = "🎉 Congratulations! You won! 🎉";
        triggerConfetti();
    } else if (turnsLeft === 0) {
        document.getElementById("message").innerText = `❌ You lost! The word was "${chosenWord}".`;
    }
}

function resetGame() {
    guessedLetters = [];
    turnsLeft = 6;
    document.getElementById("message").innerText = "";
    chooseWord();
    displayWord();
    document.getElementById("turns").innerText = turnsLeft;
}

// Party Blaster Confetti Effect
function triggerConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2000);
    }
}

// Listen for "Enter" key press in the input field
document.getElementById("guess-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});

chooseWord();
displayWord();
document.getElementById("turns").innerText = turnsLeft;
