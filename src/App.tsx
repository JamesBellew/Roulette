import { useState } from 'react'

import './index.css'
import './App.css'

import {Random} from 'random-js'

function App() {
  type Item = string;

  const [rouletteNumberLanded,setRouletteNumberLanded] = useState<number |undefined>(undefined)
  const [playerNumbersPicked, setPlayerNumbersPicked] = useState<number | undefined>(undefined);
  const [playerWin, setPlayerWin] = useState<Boolean | undefined>(undefined);
  const [specialBets, setSpecialBets] = useState<Item[]>([]);


  //* This is the array for the numbers in the Roulette wheel
  let numbers: number [] =[10,10,20,30,40,50,60,70,80,90,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]
  let specials: any []=["Red","Black","Even","Odd"]

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

const specialBetPlacedHandler=(userSpecialBetPicked:string[]):void=>{
  setSpecialBets(userSpecialBetPicked)
alert(userSpecialBetPicked)
}
const numberSelectHandler=(userNumberPicked:number):void=>{
 setPlayerNumbersPicked(userNumberPicked)
 console.log(userNumberPicked);
 
}
const chunkArray = (array: number[], size: number): number[][] => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};


// Chunk the numbers array into sub-arrays of size 13
const chunkedNumbers = chunkArray(numbers, 13);
// spinWheel()
return (
  <>
  <div className='max-h-screen my-auto min-h-screen bg-green-800 w-screen absolute top-0 left-0'>



      <div className='roulette-game  h-full my-auto'>
    <div className='roulette-table w-4/5 shadow'>
    <div className='roulette-bet-table'>
      {chunkedNumbers.map((row, rowIndex) => (
        <div key={rowIndex} className='roulette-bet-row'>
          {row.map(number => (
            <button
              className={`text-white rounded-sm${playerNumbersPicked === number ? " numberOnTableHasBet" : ""} roulette-bet-number`}
              onClick={() => numberSelectHandler(number)}
              key={number}
            >
              {number}
              <div className={`${playerNumbersPicked === number ? "chipsOnNumber" : ""}`}></div>
            </button>
          ))}
        </div>
      ))}
      <br />
      <br />
      {specials.map(special => (
        <button
          key={special}
          onClick={() => specialBetPlacedHandler(special)}
          className='w-auto px-8 py-2 border mb-5'
        >
          {special}
        </button>
      ))}
    </div>
    {playerNumbersPicked != undefined &&
    <button onClick={spinWheel} className=' btn border  bg-slate-950 text-white px-10 py-2 rounded-md'>Spin</button>
}
    </div>

<div className='w-[40%]  h-96 shadow relative flex flex-col justify-center items-center text-center my-auto mx-auto'>
  <div>
    {playerNumbersPicked !== undefined &&
      <p className='text-xl'>$50 on {playerNumbersPicked}</p>
    }
  </div>
  <div>
    {specialBets.length >=1 &&
      <p className='text-xl'>$50 on {specialBets}</p>
    }
  </div>
  <div>
    {rouletteNumberLanded !== undefined &&
      <p className='text-2xl font-bold'>{rouletteNumberLanded}</p>
    }
  </div>
</div>

    </div>
    </div>
  </>
  
);
}

export default App
