import React, { useEffect } from 'react'
import GameCircle from './GameCircle'
import "./Game.css"
import { useState } from 'react'
import GameHeader from './GameHeader'
import GameFooter from './GameFooter'
import { isDraw, isWinner, getComputerMove } from './helper'
import {
    GAME_PLAYING,
    GAME_WON,
    GAME_DRAW,
    NO_CIRCLE,
    NO_PLAYER,
    PLAYER_1,
    PLAYER_2
} from "./Constants"
const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState,setGameState]=useState(GAME_PLAYING);
    const [winPlayer,setWinPlayer]= useState(NO_PLAYER);
    
    useEffect(()=>{
        initGame();
    },[]);
    const initGame= () =>{
        console.log("init");
        //debugger;;
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_PLAYING);
        setWinPlayer(NO_PLAYER);
    }

    const initCircle = () =>{
        const circle =[];
        for(var i=0; i<NO_CIRCLE; i++){
            circle.push(renderCircle(i));
        }
        return circle;
    };

    const computerPlay = () =>{
        console.log("clicked");
        CircleHandle(getComputerMove(gameBoard,currentPlayer));
    }

    const CircleHandle = (id) => {
        if(gameBoard[id]!==0) return;
        if(gameState!==GAME_PLAYING) return;
        if(isWinner(gameBoard,id,currentPlayer)){
            console.log("Winner");
            setGameState(GAME_WON);
            setWinPlayer(currentPlayer);
        }
        if(isDraw(gameBoard,id,currentPlayer)){
            console.log("Game Draw");
            setGameState(GAME_DRAW);
            setWinPlayer(NO_PLAYER);
        }
        setGameBoard(prev => {
            return prev.map((currValue, currPos) => {
                if (currPos === id) return currentPlayer;
                return currValue;
            })
        });
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        console.log(gameBoard);
        console.log(currentPlayer);
    }

    const renderCircle = (id) => {
        return (
            <GameCircle key={id} className={`Player_${gameBoard[id]}`} id={id} onCircleHandle={CircleHandle} />)
    }
    return (
        <>
        <GameHeader gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
        <div className="GameBoard">
            {initCircle()}
        </div>
        <GameFooter onNewGameClick={initGame} onComputerClick={computerPlay} gameState={gameState}/>
        </>
    )
}

export default GameBoard