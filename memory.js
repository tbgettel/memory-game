//TYLER GETTEL MEMORY GAME ----------------------------------------------------

//variable declarations
const gameContainer = document.getElementById("game");
let flippedOne;
let flippedTwo;
let cardsFlipped =0;
let stopClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target.classList);

  //
  if(event.target.classList.contains("flipped")) return;
  if(stopClick) return;
  
  //current card is clicked
  let currentCard=event.target;
  //flip card aka change the background color of div
  currentCard.style.backgroundColor=currentCard.classList[0];

  //
  if (!flippedOne || !flippedTwo) {
    currentCard.classList.add("flipped");
    flippedOne = flippedOne || currentCard;
    flippedTwo = currentCard === flippedOne ? null : currentCard;
  }

  if (flippedOne && flippedTwo) {
    stopClick = true;

    let oneClass = flippedOne.className;
    let twoClass = flippedTwo.className;

    if (oneClass===twoClass){
      cardsFlipped+=2;
      flippedOne.removeEventListener("click", handleCardClick);
      flippedTwo.removeEventListener("click", handleCardClick);
      flippedOne=null;
      flippedTwo=null;
      stopClick=false;
    }else{
      //time out function to flip cards back over 
      setTimeout(function(){
        flippedOne.style.backgroundColor="";
        flippedTwo.style.backgroundColor="";
        flippedOne.classList.remove("flipped");
        flippedTwo.classList.remove("flipped");
        flippedOne=null;
        flippedTwo=null;
        stopClick=false;
      }, 1000);
    }
  }
  //bingo! game over
  if(cardsFlipped === COLORS.length) alert('GAME OVER!');
}



// when the DOM loads
createDivsForColors(shuffledColors);
