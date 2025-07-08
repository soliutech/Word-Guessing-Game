// Word and Hints  object
const options = {
    aroma: "Pleasing smell",
    pepper: "Salt's partner",
    halt: "put a stop to",
    jump: "Rise suddenly",
    shuffle: "Mix cards up",
    combine: "Add; Mix",
    chaos: "Total disorder",
    labyrinth: "Maze",
    disturb: "Interrupt; upset",
    shift: "Movev; period of word",
    machine: "Device or appliance",
};
// Initial Referances
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
randomHint = "";
let winCount = 0,
lossCount = 0;

// Generator random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
};

// Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

// Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
};


// Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
    <span>Hint:</span> ${randomHint} </div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        displayItem += `<span class="inputSpace">_</span>`;
    });

    // Display each element as a span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id= 'chanceCount'>Chances Left: ${lossCount}</div>`;
};

// Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText="";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    //For creating letters buttons
    for(let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");

        // Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);

        //Character button onclick event
        button.addEventListener("click", (e) => {
            message.innerText = `Correct Letter`;
            message.style.color = "#008000";
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");

            // If array contains clicked value replace matched dosh with letter
            if(charArray.includes(button.innerText)){
                charArray.forEach((char, index) => {
                    // if character  in array is same as clicked button
                    if(char === button.innerText) {
                        button.classList.add("correct");
                        // Replace the dash with the letter
                        inputSpace[index].innerText = char;
                        // Increment win count
                        winCount += 1;
                        // If win count is equal to the length of the word
                        if(winCount == charArray.length) {
                            resultText.innerText = "You Won!";
                            startBtn.innerText = "Restart ";
                            // block all the buttons
                            blocker();
                        }
                    }
                });
            }
            else {
             //loss count
             button.classList.add("incorrect");
                lossCount -= 1;
                document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";
                if(lossCount == 0) {
                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                    resultText.innerText = "Game Over!";
                    blocker();
                }
            }
            // Disable the button after click
            button.disabled = true;
        });


        // Append event listener to each button
        letterContainer.appendChild(button);
    }
};

window.onload = () => {
    init();
}