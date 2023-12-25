import React from 'react'
import "./Game.css"
const GameFooter = ({onNewGameClick,onComputerClick,gameState}) => {
    return (
        <div className="panel footer">
            
            <button onClick={onNewGameClick}>New Game</button>
            <button onClick={onComputerClick}>Computer</button>
        </div>
    )
}

export default GameFooter