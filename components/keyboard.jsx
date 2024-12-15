
import React from "react"
export default function Keyboard(props)
{
    
    return(
        <button 
         className={props.classname}
         disabled={props.isdisabled}
         onClick={()=>{
            props.onclick(props.letter);
           
           
        } }>{props.letter.toUpperCase()}</button>
    )
}
