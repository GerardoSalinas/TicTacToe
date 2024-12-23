let game = {
    board: [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ],

    printBoard(){
        console.log(`  0 1 2`);
        console.log(`0 ${this.board[0][0]} ${this.board[0][1]} ${this.board[0][2]}`);
        console.log(`1 ${this.board[1][0]} ${this.board[1][1]} ${this.board[1][2]}`);
        console.log(`2 ${this.board[2][0]} ${this.board[2][1]} ${this.board[2][2]}`);
    },

    transitiveProp (a,b,c) {
        return (a === b && b === c);
    },

    checkForWinner(){
        let winner = null;
        //check horizontal
        for (let row = 0; row < 3; row++){
            if (this.transitiveProp(this.board[row][0], this.board[row][1], this.board[row][2])){
                winner = this.board[row][0];
                break;
            }
        }
        //check vertical
        for (let col = 0; col < 3; col++){
            if (this.transitiveProp(this.board[0][col], this.board[1][col], this.board[2][col])){
                winner = this.board[0][col];
                break;
            }
        }
        //check diagonal
        if (this.transitiveProp(this.board[0][0], this.board[1][1], this.board[2][2])){
            winner = this.board[0][0];
        }

        if (this.transitiveProp(this.board[0][2], this.board[1][1], this.board[2][0])){
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

    }
}

function createPlayer(marker, name) {
    let record = 0;
    const increaseRecord = () => record++;
    const getRecord = () => record;
    const isWinner = false;
    return {name,marker,isWinner,increaseRecord,getRecord};
}

const readline = require("readline-sync");

const player1 = createPlayer("X", "player1");
const player2 = createPlayer("O", "player2");
let count = 1;

while ( count <= 9 ){
    game.printBoard();
    let currentPlayer;
    (count%2 !== 0) ? currentPlayer = player1 : currentPlayer = player2; 
    console.log(`turno de ${currentPlayer.name}`);
    const x = readline.question("ingrese la coordenada X: ");
    const y = readline.question("ingrese la coordenada Y: ");
    game.board[y][x] = currentPlayer.marker 
    //check for winner
    let winner = game.checkForWinner();
    if (winner) {
        game.printBoard();
        console.log(`${winner.name} WINS!`);
        break;
    }
    count++;
}

//check for winner one last time

