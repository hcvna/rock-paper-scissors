

const shapes = ["rock", "paper", "scissors"];

function game() {
    let pScore = 0;
    let cScore = 0;

    for (let i = 1; i < 6; i++) {
        let pInput = getPlayerInput(i);
        let cInput = getComputerInput();

        let result = playRound(pInput, cInput);

        if (result > 0) {
            pScore++;
        }
        else if (result < 0){
            cScore++;
        }
    }

    if (pScore > cScore) {
        console.log(`You won the tour! ${pScore}-${cScore}`);
    }
    else if (cScore > pScore) {
        console.log(`You lost the tour! ${pScore}-${cScore}`);
    }
    else {
        console.log(`The tour is draw! ${pScore}-${cScore}`);
    }
}

function getPlayerInput(roundNum) {
    while (true) {
        let input = window.prompt(`Round ${roundNum} - Input your selection: `, "");
        if (input) {
            if (shapes.includes(input.toLowerCase())) {
                return input;
            }
        }
        alert("Invalid input!");
    }
}

function getComputerInput() {
    let randomNum = randomBetween(0, shapes.length - 1);
    return shapes[randomNum];
}

function randomBetween(min, max) {
    let randomNum = Math.random();
    let increaseByOne = Math.floor(randomNum * 10) % 2 > 0;
    let difference = increaseByOne ? 1 : 0;
    let result = Math.floor(randomNum * max) + difference;
    return result;
}

function playRound(pInput, cInput) {
    let result = compareSelection(pInput, cInput);
    let announce = getRoundAnnouncement(result, pInput, cInput);
    console.log(announce);

    return result;
}

function compareSelection(playerSelection, computerSelection) {
    let result_pairs = [
        ["rock", "rock", 0],
        ["paper", "paper", 0],
        ["scissors", "scissors", 0],
        ["rock", "paper", -1],
        ["rock", "scissors", 1],
        ["paper", "rock", 1],
        ["paper", "scissors", -1],
        ["scissors", "rock", -1],
        ["scissors", "paper", 1],
    ]

    let result = null;
    for (const pair of result_pairs) {
        if (pair[0] !== playerSelection.toLowerCase()) { continue; }
        else if (pair[1] !== computerSelection.toLowerCase()) { continue; }
        else {
            result = pair[2];
            break;
        }
    };

    if (result !== null) {
        return result;
    }

    throw "Selection not valid!";
}

function getRoundAnnouncement(result, pInput, cInput) {
    let announce = "";

    cInput = getFormattedSelection(cInput);
    pInput = getFormattedSelection(pInput);

    if (result == 0) {
        announce = `Draw! Both picked ${cInput}`;
    }
    else if (result == -1) {
        announce = `You Lose! ${cInput} beats ${pInput}`;
    }
    else if (result == 1) {
        announce = `You Win! ${pInput} beats ${cInput}`;
    }

    return announce;
}

function getFormattedSelection(input) {
    let allLower = input.toLowerCase();
    let formatted = allLower[0].toUpperCase().concat(allLower.substr(1));
    return formatted;
}



