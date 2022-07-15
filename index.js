// declaring some constants
const X_CLASS = 'x'
const CIRCLE_CLASS = 'o'

// indices that result in win
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


const cellElements = document.querySelectorAll('[data-cell]')
const board =  document.getElementById('board')
const winningMessageElement=  document.getElementById('win-msg')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')

let circleTurn

startGame()

// restart button to start the game
restartButton.addEventListener('click' , startGame)

// Start the game - looping through cell elements and add event listener  
function startGame(){
    circleTurn = false
    cellElements.forEach(cell=>{      
        // reset states when starting new game 
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click' , handleClick)

        // call the handleClick 
        cell.addEventListener('click', handleClick, {once:true})
    }) 
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}



// handleclick function 
function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn? CIRCLE_CLASS : X_CLASS
    // we need to do 4 main tasks
    // Place a mark

    placeMark(cell,currentClass)

    // Check for win -- Check for draw -- Switch Turns
    if(checkWin(currentClass)){

        endGame(false)

    }
    else if(isDraw()){

        endGame(true)

    }else{

        switchTurns()
        setBoardHoverClass() //to hover the mark in boxes

    }
}


// function to end the game
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }else{
        winningMessageTextElement.innerText = `${circleTurn? "O Wins!" : "X Wins!"}`
    }
    winningMessageElement.classList.add('show')
}


// to check if its a draw
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


// mark X or O
function placeMark(cell , currentClass){
    cell.classList.add(currentClass)
}

// to switch turns
function switchTurns(){
    circleTurn = !circleTurn
}

// hover effect for X or O
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

// check if its a win
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combi =>{
        return combi.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}