let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Indicates whether it's player O's turn (true) or player X's turn (false)

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// Add event listeners to each box for clicks
boxes.forEach((box) => {  
    box.addEventListener("click", () => {
        console.log("button was clicked");

        // Update the box with the current player's mark (O or X) and switch turns
        if(turnO) {   
            box.innerText = "O";
            box.classList.add("O"); 
            turnO = false;
        } else {   
            box.innerText = "X";
            box.classList.add("X"); 
            turnO = true;
        }

        box.disabled = true; // Disable the clicked box to prevent further clicks

        checkWinner(); // Check for a winner after each move
    });
});

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";  // Clear the text from the box
        box.classList.remove("O"); // Remove the O class
        box.classList.remove("X"); // Remove the X class
    }
}

const disableBoxes = () => { // Disable all boxes
    for(let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner} !!!`; // Display winner message
    msgContainer.classList.remove("hide"); // Show the message container
    disableBoxes(); // Disable all boxes to end the game
}

const checkWinner = () => {
    let boxesFilled = 0;
    for (let box of boxes) {
        if (box.innerText !== "") {
            boxesFilled++; // Count the number of filled boxes
        }
    }
    if (boxesFilled === 9) {
        msg.innerText = "Match is a draw!"; // Display draw message
        msgContainer.classList.remove("hide"); // Show the message container
        disableBoxes(); // Disable all boxes
    }

    // Check all win patterns
    for (pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // If all positions in the pattern have the same value and are not empty, declare the winner
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

const resetGame = () => {
    turnO = true; // Reset to player O's turn
    enableBoxes(); // Enable all boxes for a new game
    msgContainer.classList.add("hide"); // Hide the message container
};

// Attach event listeners to buttons for resetting the game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
