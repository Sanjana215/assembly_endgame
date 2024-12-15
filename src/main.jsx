import {languages} from "../assembly.js"
import Span from "../components/span.jsx"
import Word from "../components/word.jsx"
import Keyboard from "../components/keyboard.jsx"
import React from "react"
import clsx from 'clsx';
import getFarewellText from "../utils.js"
import {words} from "../words.js"
import Confetti from 'react-confetti'


export default function Main()
{
  function randomword()
  {
    return words[Math.floor(Math.random()*words.length)]
  }
  
 
  let[currentword,func]=React.useState(()=>{return randomword()})

  let[word_g,word_f]=React.useState([])
 
let wrongcount=-1
if(word_g.length>0)
{
  wrongcount= word_g.filter((ele)=>{
    return !currentword.includes(ele)
 }).length
}

 
 let isguessedwrong=false;
 if(word_g.length>0)
 {
  isguessedwrong=!currentword.includes(word_g[word_g.length-1])
 }
 
  let langs=languages.map((ele,idx)=>{
    
    return <Span
    key={idx}
    name={ele.name} 
    backgroundcolor={ele.backgroundColor}
    color={ele.color}
    classname={clsx({
      hit:idx<wrongcount,
      
    })} />
    
    })

  let won=currentword.split("").every((letter)=>{
      return word_g.includes(letter)
   })
   let lost=wrongcount>(langs.length-1)?true:false
  let word = currentword.split("").map((ele,idx)=>{
      
      return (word_g.includes(ele) || lost)?<Word key={idx} text={ele} classname={clsx(lost && !word_g.includes(ele) && "wrongtext")}/>:<Word key={idx} text={""} classname=""/>
  })
  

  let alphabets="abcdefghijklmnopqrstuvwxyz"
  

  function handleclick_key(letter)
  {  
    word_f((prev)=>{
      
      return prev.includes(letter)?prev:[...prev,letter]
      
    })
  }

  let isdisabled=(won|| lost)?true:false

  let keyboard=alphabets.split("").map((letter,idx)=>{
    let isguessed=word_g.includes(letter)
    let iscorrect=isguessed && currentword.includes(letter)
    let iswrong=isguessed && !currentword.includes(letter)
    let classname=clsx({
      correct: iscorrect,
      wrong: iswrong
    })
   
    
    return <Keyboard key={idx} isdisabled={isdisabled} letter={letter} onclick={handleclick_key} classname={classname}  />
  })
  
  function newgame()
  {
    func(()=>{return randomword()})
    word_f([])
  }
 
  function rendersection()
  {
    let guessed_text=""

    if(wrongcount>0 && wrongcount<=languages.length && isguessedwrong)
      {
        guessed_text=getFarewellText(languages[wrongcount-1].name)
      }  
      if(guessed_text && !won && !lost)
      {
        return <>
            <p>{guessed_text}</p>
        </>
      }
      else if(won||lost)
      {
        return <>
        <h2>
          { won
            ? "Game won"
            : "Game over"}
        </h2>
        <p>
          { won
            ? "Well done! 🎉"
            : "You lose! Better start learning Assembly 😭"}
        </p>
      </>
      }
      else if(!isguessedwrong && wrongcount>=0)
      {
         return <p>{`Keep saving the remaining ${languages.length-wrongcount} languages!`}</p>
      }  
  }
  
  
  return(
    <>
       
       {won && <Confetti recycle={false} numberOfPieces={1000}/>}
        <div>
            <h2>Assembly:Endgame</h2>
            <p>Guess the word in under 8 seconds the keep to the programming world safe from assembly</p>
            <section
   className={clsx({
    gamewon: won,
    gamelost: lost,
    farewell:!won && !lost && isguessedwrong,
    correct:!won && !lost && !isguessedwrong  && wrongcount>=0
    
  })}
>
     { rendersection()}
</section>           
             <div className="language">
                   {langs}
             </div>
             <div className="word">
              {word}
             </div>
             <div className="keyboard">
                  {keyboard}
             </div>
             {(won || lost ) && <button onClick={newgame} className="new-button">New Game</button>}
        </div>
    </>
  )
}