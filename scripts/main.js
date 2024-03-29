
// Request user to inut one of three play choices "ROCK", "PAPER", or
// "SCISSORS".  Format the choice to all capital letters before returning.
function playerPlay() {
  let acceptableChoice = ["R", "P", "S", null];
  let playerHand;
  // prompt player, while screening out unacceptable answers
  do {
    playerHand =  window.prompt("Please make your selection by typing either 'R' for Rock,' 'P' for 'Paper,' or 'S' for 'Scissors'.\n(Pressing 'Cancel' will end the match.)");
    if (playerHand != null) {
      playerHand = playerHand.slice(0,1).toUpperCase();
    }
  } while (!acceptableChoice.includes(playerHand));
  if (playerHand == "R"){
    return "ROCK";
  } else if (playerHand == "P") {
    return "PAPER";
  } else if (playerHand == "S") {
    return "SCISSORS";
  } else {
    return "CANCEL";  // (user cancelled prompt)
  }
}

// Randomly return one of three play choices (formatted in capital letters)
function computerPlay() {
  let randomToHundred = Math.floor((Math.random() * 100) + 1); // 1 through 100
  if (randomToHundred <= 33) {
   return "ROCK";
 } else if (randomToHundred <= 66) {
    return "PAPER";
  } else {
   return "SCISSORS";
  }
}

// Determine the winner of a round, given the choice of each player, in
// the form of  "ROCK", "PAPER", or "SCISSORS".
// The Choices must be preformatted in all capital letters.
// Returns array of 2 strings: the winner or "tie", and the
// message to display the outcome of the round.
function playRound(playerSelection, computerSelection) {
  let playerComputerHand = `${playerSelection} ${computerSelection}`;
  let winCase = ["PAPER ROCK", "ROCK SCISSORS", "SCISSORS PAPER"];
  let loseCase = ["ROCK PAPER", "SCISSORS ROCK", "PAPER SCISSORS"];
  let tieCase = ["ROCK ROCK", "PAPER PAPER", "SCISSORS SCISSORS"];
  let result = [];
  if (winCase.includes(playerComputerHand)){
    result = ["player", `You Win! ${playerSelection} beats ${computerSelection}.`];
  } else if (loseCase.includes(playerComputerHand)){
    result = ["computer", `You Lose! ${playerSelection} is beaten by ${computerSelection}.`];
  } else if (tieCase.includes(playerComputerHand)){
    result = ["tie", `You Tied! ${playerSelection} is the same as ${computerSelection}.\nReplay this round:`];
  } else {
    // occurs if  user cancels prompte in playerPlay()
    result = ["cancel", "Player has cancelled the match."];
  }
  return result;
}

// returns 2 item array: [true/false, "player"/"computer"/"none]
// position 0 indicates if a winner exists, position 1 is who won.
// Different consideration if number of rounds is even or odd.
function reportWinnerStatus(numRounds, playerScore, computerScore) {
  winner = [false, "Nobody"];
  let majorityToWin = Math.floor(numRounds/2) + 1;
  if (playerScore >= majorityToWin){
    winner= [true, "Player"];
  } else if (computerScore >= majorityToWin){
    winner= [true, "Computer"];
  }
  return winner;
}

function scoreMessage(playerScore, computerScore) {
  return `Score: Player: ${playerScore} Computer: ${computerScore}`;
}

// returns true if player wants to play again.
function playAgain() {
  let acceptableAnswer = ["y", "Y", "n", "N", null];
  let continueOptions = ["y", "Y"];
  let playerAnswer;
  // prompt player, while screening out unacceptable answers
  do {
    playerAnswer =  window.prompt("Would you like to play another match? ('Y' or 'N').\n(Pressing 'Cancel' will also end the game.)");
  } while (!acceptableAnswer.includes(playerAnswer));

  if (continueOptions.includes(playerAnswer)) {
    return true;
  } else {
    return false;
  }
}

// sectino divider for clarity in console output
function displayHorizontalRule() {
  console.log("___________________________________________");
}

// Run a match, with the number of rounds set by variable numRounds.
// Continues running additional matches unless user selects "N" at prompt.
function game(numRounds) {
  console.log("Let's play a game of 'Rock Paper Scissors'.");
  let continueGame = true;
  let continueRound = true;
  let playerScore = 0;
  let computerScore = 0;
  let playerChoice;    // rock,paper,scissors
  let computerChoice;  // rock,paper,scissors
  let result;  // round result (array) returned from playRound()
  let matchWinner = reportWinnerStatus(numRounds, playerScore, computerScore);
  while (continueGame) {
    console.log(`Best out of ${numRounds} rounds wins the match!`);
    console.log("We start with...");
    console.log(scoreMessage(playerScore, computerScore));
    displayHorizontalRule();
    // Round of Play
    for (let i = 1; i < numRounds + 1; i++) {
      console.log(`Round ${i}:`);
      while (continueRound) {
        playerChoice = playerPlay();
        computerChoice = computerPlay();
        result = playRound(playerChoice, computerChoice);
        console.log(result[1]); // display the hand outcome
        if (result[0] != "tie") {
          continueRound = false;
        }
      }
      // reset while loop parameter before break sequences, in case play again
      continueRound = true;

      // leave the match if player cancelled at playRound() prompt
      if (result[0] == "cancel") {
        displayHorizontalRule();
        break;
      }
      //round won: update and show score, and reset tie tracking variable
      if (result[0] == "player") {
        playerScore += 1;
      } else if (result[0] == "computer") {
        computerScore += 1;
      }
      console.log(scoreMessage(playerScore, computerScore));
      displayHorizontalRule();
      // declare winner if one party has majority of rounds won.
      matchWinner = reportWinnerStatus(numRounds, playerScore, computerScore);
      if (matchWinner[0] == true) {
        break;
      }
    }
    // end of match...show outcome
    console.log(`Match Over...${matchWinner[1]} Wins!`);
    displayHorizontalRule();

    // Prompt player to play again or not.
    let playAnotherMatch = playAgain();
    if (playAnotherMatch == true) {
      console.log("Great! I'll prepare a new match...");
      // reset game variables
      playerScore = 0;
      computerScore = 0;
      matchWinner = [false, "Nobody"];
    } else {
      continueGame = false;
      console.log("Thank you for playing. Goodbye...");
      console.log("If you wish to play again, please refresh this page,");
      console.log("or click the 'Start-Game' button.");
    }
  }
}

// listener for "start game button".
// Default is set to run 5 rounds per match.
var btn = document.querySelector('#game-start');
btn.addEventListener('click', () => {
  game(5);
});
