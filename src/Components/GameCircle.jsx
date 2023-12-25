import React from 'react'
import "./Game.css"
const GameCircle = ({id,onCircleHandle,children,className}) => {
    // const circleHandle = (id) =>{
    //     alert("Circle Clicked: " + id);
    // }
    
  return (
    <div className={`GameCircle ${className}`} onClick={()=> onCircleHandle(id)}>
        {children}
    </div>
  )
}

export default GameCircle