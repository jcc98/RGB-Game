// DOM operation
const rgbRed = document.getElementById("rgbRed");
const rgbGreen = document.getElementById("rgbGreen");
const rgbBlue = document.getElementById("rgbBlue");
const btn = document.getElementById("btn");
const containerTitle = document.getElementById("start-title");
const gameUI = document.getElementById("game-ui");
const myBar = document.getElementById("myBar");
const item0 = document.getElementById("itemOne");
const item1 = document.getElementById("itemTwo");
const item2 = document.getElementById("itemThree");
const item3 = document.getElementById("itemFour");
const ulTarget = document.getElementById("ul");
const gameOver = document.getElementById("game-over");
const scoreDisplay = document.getElementById("score");
const guess = document.getElementById("guess");
const gameOverText = document.getElementById("game-over-text");
let id;


// Declare rgb arrays
let rgbObj = [];
let rgbFake1 = [];
let rgbFake2 = [];
let rgbFake3 = [];
let fourAnswers = [];
let rgbObjTitle;
// Count Variables
const totalGame = 10;
let score = 0;
const scoreLimit = 10;
let width = 0;
let nbOfGuesses = 0;
let match;

// Functions
genNumbers();

// Shuffle array algo
function shuffle (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};


// Function for generating 3 fake random RGBs + The real one (rgbObj)
function genNumbers() {
    for (i = 0; i < 3; i++) {
        rgbFake1[i] = Math.floor(Math.random() * 255);
        rgbFake2[i] = Math.floor(Math.random() * 255);
        rgbFake3[i] = Math.floor(Math.random() * 255);
        rgbObj[i] = Math.floor(Math.random() * 255);

    }
    fourAnswers.push(rgbFake1);
    fourAnswers.push(rgbFake2);
    fourAnswers.push(rgbFake3);
    fourAnswers.push(rgbObj);
    rgbRed.textContent = rgbObj[0];
    rgbGreen.textContent = rgbObj[1];
    rgbBlue.textContent = rgbObj[2];
    shuffle(fourAnswers);
// Change bullets to color
item0.style.backgroundColor = `rgb(${fourAnswers[0]})`;
item1.style.backgroundColor = `rgb(${fourAnswers[1]})`;
item2.style.backgroundColor = `rgb(${fourAnswers[2]})`;
item3.style.backgroundColor = `rgb(${fourAnswers[3]})`;
match = `rgb(${rgbObj[0]}, ${rgbObj[1]}, ${rgbObj[2]})`;

};

//

// Event listener when bullet is clicked
ulTarget.addEventListener("click", (e) => {
    if (e.target.value !== 0) return;
    if (e.target.style.backgroundColor === match) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        fourAnswers = [];
        genNumbers();
        clearInterval(id);
        width = 0;
        myBar.style.width = width + "%";
        move();
        nbOfGuesses++;
        guess.textContent = `Questions left: ${nbOfGuesses}/${scoreLimit}`;

    } else {
        score--;
        scoreDisplay.textContent = `Score: ${score}`;
    }
});


// Run App Function
const runApp = () => {
    containerTitle.classList.add("container-change");
    gameUI.classList.remove("container-change");
    move();
    scoreDisplay.textContent = `Score: ${score}`;

}

function move() {
    id = setInterval(() => {
    if (width > 100 || nbOfGuesses >= scoreLimit) {
        clearInterval(id);
        count = 0;
        gameOver.classList.remove("container-change");
        gameUI.classList.add("container-change");
        gameOverText.textContent = `Your score was ${score} (Max score: ${scoreLimit})`
        }
    
     else {
        width++;
        myBar.style.width = width + "%";
    }
    }, 100);
    }

// Event Listener Start game on button click
btn.addEventListener("click", runApp);
restart.addEventListener("click", () => location.reload());