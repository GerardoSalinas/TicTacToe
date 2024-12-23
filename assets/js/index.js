let counter = 0;
let player1 = null;
let player2 = null;

function createPlayer(marker, name) {
    let isWinner = false;
    return {name,marker,isWinner};
}

const gameBoard = {
    board: Array.from(document.querySelectorAll(".cell")).map((cell) => cell.innerText),
    updateBoard(){
        this.board = Array.from(document.querySelectorAll(".cell")).map((cell) => cell.innerText);
    },

    initializeBoard: function () {
        board = Array.from(document.querySelectorAll(".cell"));
        board.forEach((cell) => {
            cell.addEventListener("click", eventHandlers.clickCell.bind(cell))
        })
    },

    transitiveProp: function (a,b,c) {
        return (a === b && b === c);
    },

    checkWinner: function (){
        let winner = null;
        //check horizontal
        for (let row = 0; row < 3; row++){
            if (this.transitiveProp(this.board[row*3], this.board[row*3 + 1], this.board[row*3 + 2]) && this.board[row*3] !== ""){
                winner = board[row][0];
                break;
            }
        }
        //check vertical
        for (let col = 0; col < 3; col++){
            if (this.transitiveProp(this.board[col], this.board[col + 3], this.board[col + 6]) && this.board[col] !== ""){
                winner = this.board[0][col];
                break;
            }
        }
        //check diagonal
        if (this.transitiveProp(this.board[0], this.board[4], this.board[8]) && this.board[0] !== ""){
            winner = this.board[0][0];
        }

        if (this.transitiveProp(this.board[6], this.board[4], this.board[2]) && this.board[2] !== ""){
            winner = this.board[2][0];
        }

        if (winner === null){
            return null;
        }else{
            if (player1.marker === winner){
                player1.isWinner = true;
                return player1;
            }else{
                player2.isWinner = true;
                return player2;
            }
        }
    },
};

const eventHandlers = {
    clickCell: function() {
        if (this.innerText === ""){
            (counter%2 === 0) ? this.innerText = "X" : this.innerText = "O";
            gameBoard.updateBoard();
            let winner = gameBoard.checkWinner();
            if (winner) {
                let playerScore = document.querySelector((winner === player1) ? "#player1-score" : "#player2-score");
                playerScore.innerText = (parseInt(playerScore.innerText) + 1).toString();
                alert(`${winner.name} WINS!`);
            }
            counter++;
        }
    },

    restartGame: function() {
        Array.from(document.querySelectorAll(".cell")).forEach((cell) => cell.innerText = "");
        gameBoard.updateBoard();
        document.getElementById("player1-score").innerText = "0";
        document.getElementById("player2-score").innerText = "0";
        counter = 0;
    }
}

const gameFlow = (function () {
    let player1Name = prompt("Enter your name player1: ");
    let player2Name = prompt("Enter your name player2: ");
    player1 = createPlayer("X", player1Name);
    player2 = createPlayer("O", player2Name);
    gameBoard.initializeBoard();
    document.getElementById("player1-name").innerText = player1.name;
    document.getElementById("player2-name").innerText = player2.name;
    document.getElementById("restart-btn").addEventListener("click", eventHandlers.restartGame);
    return 
})();

