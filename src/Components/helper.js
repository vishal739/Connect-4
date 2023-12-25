import { PLAYER_1,PLAYER_2 } from "./Constants";

export const isWinner = (gameBoard,currentMove,currentPlayer) => {
    let board=[...gameBoard];
    board[currentMove]=currentPlayer;
    const winLines = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,5,10,15],
        [3,6,9,12]
    ]
    for(let i=0;i<winLines.length; i++){
        const [c1,c2,c3,c4] = winLines[i];
        if(board[c1]>0 &&
            board[c1] === board[c2] &&
            board[c2] === board[c3] &&
            board[c3] === board[c4]){
                return true;
            }
    }
    return false;
}

export const isDraw = (gameBoard,currentMove,currentPlayer) =>{
    let board=[...gameBoard];
    board[currentMove]=currentPlayer;

    let count= board.reduce((n,x) => n + (x===0),0);
    console.log(`count ${count}`);
    return count === 0;
}
const getPosition = (gameBoard,moveChecks,currentPlayer) => {
    for(let check=0;check<moveChecks.length;check++){
        for(let i=0;i<moveChecks[check].max;i+=moveChecks[check].step){
            const series= gameBoard[i + moveChecks[check].indexes[0]].toString() + 
            gameBoard[i + moveChecks[check].indexes[1]].toString()+ 
            gameBoard[i + moveChecks[check].indexes[2]].toString()+ 
            gameBoard[i + moveChecks[check].indexes[3]].toString();

            switch(series){
                case "1110":
                    if (currentPlayer === PLAYER_1) {
                        // Computer winning move
                        return i + moveChecks[check].indexes[3];
                    } 
                    break;
                case "2220":
                    if (currentPlayer === PLAYER_1) {
                        // Player winning move, block it
                        return i + moveChecks[check].indexes[3];
                    }
                    break;
                case "1101":
                    if (currentPlayer === PLAYER_2) {
                        // Computer winning move
                        return i + moveChecks[check].indexes[2];
                    } else if (currentPlayer === PLAYER_1) {
                        // Player winning move, block it
                        return i + moveChecks[check].indexes[2];
                    }
                    break;
                case "2202":
                    if (currentPlayer === PLAYER_1) {
                        // Player winning move, block it
                        return i + moveChecks[check].indexes[2];
                    } else if (currentPlayer === PLAYER_2) {
                        // Computer winning move
                        return i + moveChecks[check].indexes[2];
                    }
                    break;
                case "1011":
                    if (currentPlayer === PLAYER_2) {
                        // Computer winning move
                        return i + moveChecks[check].indexes[1];
                    } else if (currentPlayer === PLAYER_1) {
                        // Player winning move, block it
                        return i + moveChecks[check].indexes[1];
                    }
                    break;
                case "2022":
                    if (currentPlayer === PLAYER_1) {
                        // Player winning move, block it
                        return i + moveChecks[check].indexes[1];
                    } else if (currentPlayer === PLAYER_2) {
                        // Computer winning move
                        return i + moveChecks[check].indexes[1];
                    }
                    break;
                case "0111":
                    if (currentPlayer === PLAYER_2) {
                        // Computer winning move
                        return i + moveChecks[check].indexes[0];
                    }
                    break;
                case "0222":
                    if (currentPlayer === PLAYER_1) {
                        // Player winning move, block it
                        return i + moveChecks[check].indexes[0];
                    }
                    break;
                default:
                    break;
            }
            
        }
    }
    return -1;
};
export const getComputerMove = (gameBoard,currentPlayer) => {
    let moveChecks =[
        //vertical Moves
        {
            indexes: [0,4,8,12],
            max: 4,
            step: 1,
        },
        //horizontal Moves
        {
            indexes: [0,1,2,3],
            max:16,
            step:4,
        },
        //two diagonals
        {
            indexes: [0,5,10,15],
            max:16,
            step:16,
        },
        {
            indexes: [3,6,9,12],
            max: 16,
            step: 16,
        },
    ];
    let position = getPosition(gameBoard,moveChecks,currentPlayer);
    if(position===-1){
        position=randomMove(gameBoard);
    }
    return position;
}
const randomMove = (gameBoard) => {
    let validMoves = [];
    for (let i=0;i<gameBoard.length;i++){
        if(gameBoard[i]===0){
            validMoves.push(i);
        }
    }
    const move= Math.floor(Math.random() * validMoves.length);
    return validMoves[move];
}