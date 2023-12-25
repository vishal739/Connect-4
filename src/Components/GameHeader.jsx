import React from 'react'
import "./Game.css"
import { GAME_PLAYING, GAME_WON } from './Constants'

const GameHeader = ({gameState,currentPlayer,winPlayer}) => {
    const playRender =() =>{
        switch(gameState){
            case GAME_PLAYING:
                return <div>Player {currentPlayer} Turn</div>
            case GAME_WON:
                return <div>Player {winPlayer} Won</div>
            default:
                return <div> Game Draw </div>
        }
    }
    return (
        <div className="panel header">
            <div className='headerText'>
                {playRender()}
            </div>
        </div>
    )
}

export default GameHeader