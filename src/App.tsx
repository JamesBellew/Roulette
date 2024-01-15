import { useState } from 'react'

import './index.css'
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
    const numberPicked: number  = random.integer(0,numbers.length)
    setRouletteNumberLanded(numberPicked)
    console.log(numberPicked + " is the number landed");
    console.log(playerNumbersPicked + " is what you picked");
    
    // Ensure playerNumbersPicked is not undefined before calling checkForWinner
  if (playerNumbersPicked !== undefined) {
    //chekc to see if the player has won by checking its boolean return
    if(checkForWinnerNumber(numberPicked, playerNumbersPicked)){
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
function checkForWinnerNumber(rouletteNumber:number,playerNumber:number):boolean{
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
    <h1 className='mb-20'>Place your bets</h1>


      <div className='roulette-game  h-full'>
    <div className='roulette-table w-3/5'>
    <div className='roulette-bet-table '>
      {numbers.map(number => (
        <button className={` text-white  rounded-sm${playerNumbersPicked == number ? "numberOnTableHasBet" : ""} roulette-bet-number`} onClick={()=>numberSelectHandler(number)}
        
        key={number}>
          
          {number}
          <div className={`${playerNumbersPicked == number ? "chipsOnNumber" : ""} `}>
            
          </div>
          </button>
      ))}
    </div>
    {playerNumbersPicked != undefined &&
    <button onClick={spinWheel} className=' btn border p- bg-slate-950 text-white px-10 py-2 rounded-md'>Spin</button>
}
    </div>
{/* <div className="roulette-wheel relative w-96 h-96 mx-auto bg-black rounded-full">
    <div className="bg-red-600 w-[5%] mx-auto h-44 absolute left-[45%]  "></div>
    <div className="bg-red-600 w-[5%] mx-auto h-44 absolute left-[45%] rotate-12  "></div>
    <div className="bg-red-600 w-[5%] mx-auto h-44 absolute left-[45%]  "></div>
</div> */}

<div className='w-[40%] relative flex flex-col justify-center items-center text-center my-auto mx-auto'>
  <div>
    {playerNumbersPicked !== undefined &&
      <p className='text-xl'>$50 on {playerNumbersPicked}</p>
    }
  </div>
  <div>
    {rouletteNumberLanded !== undefined &&
      <p className='text-2xl font-bold'>{rouletteNumberLanded}</p>
    }
  </div>
</div>

    </div>
  </>
);
}

export default App
