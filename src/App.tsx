import { useState } from 'react'

import './App.css'
import {Random} from 'random-js'

function App() {
  const [rouletteNumberLanded,setRouletteNumberLanded] = useState<number |undefined>(undefined)
  const [playerNumbersPicked, setPlayerNumbersPicked] = useState<number | undefined>(undefined);
  const [playerWin, setPlayerWin] = useState<Boolean | undefined>(undefined);

  //* This is the array for the numbers in the Roulette wheel
  let numbers: number [] =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37]

  function spinWheel(): number{
    const random = new Random();
    const numberPicked: number  = random.integer(1,numbers.length)
    console.log(numberPicked + " is the number landed");
    console.log(playerNumbersPicked + " is what you picked");
    
    // Ensure playerNumbersPicked is not undefined before calling checkForWinner
  if (playerNumbersPicked !== undefined) {
    //chekc to see if the player has won by checking its boolean return
    if(checkForWinner(numberPicked, playerNumbersPicked)){
alert('you have won')
    }else{
      console.log('you lost :(');
      
    }
  } else {
    // Handle the case where playerNumbersPicked is undefined
    console.log("Player number not picked yet");
  }
    return numberPicked;
   
  }
function checkForWinner(rouletteNumber:number,playerNumber:number):boolean{
//checking to see if the 
let flag = false;
if (rouletteNumber === playerNumber){
flag = true
}else{
 flag = false
}
return flag
}
const numberSelectHandler=(userNumberPicked:number):void=>{
 setPlayerNumbersPicked(userNumberPicked)
 console.log(userNumberPicked);
 
}

// spinWheel()
return (
  <>
    <h1>Place your bets</h1>

      <p>{rouletteNumberLanded} Landed</p>
      <p>{playerNumbersPicked} Picked</p>
      <div className='roulette-game'>
    <div className='roulette-table'>
    <div className='roulette-bet-table'>
      {numbers.map(number => (
        <button className={`${playerNumbersPicked == number ? "numberOnTableHasBet" : ""} roulette-bet-number`} onClick={()=>numberSelectHandler(number)}
        
        key={number}>
          
          {number}
          <div className={`${playerNumbersPicked == number ? "chipsOnNumber" : ""} `}></div>
          </button>
      ))}
    </div>
    {}
    <button onClick={spinWheel}>Spin</button>
    </div>
    <div className='roulette-wheel'></div>
    </div>
  </>
);
}

export default App
