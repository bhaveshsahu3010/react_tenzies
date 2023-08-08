import React from "react";
import Die from "./components/Die";
import "./App.css";
import Confetti from 'react-confetti'


function App() {


  function allNewDice() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.floor((Math.random() * 6) + 1),
        isHeld: false,
        id: i
      })
    }
    return arr
  }
  

  const [dice, setDice] = React.useState(allNewDice())


  const [tenzies,setTenzies] = React.useState(false)

  React.useEffect(()=>{
      if(dice.every(x=> x.isHeld) && dice.every(x=>x.value === dice[0].value))
      {
          setTenzies(true)
          console.log("You won!")
      }
  },[dice])


  function holdDice(id) {
      setDice(old => old.map(x=>
        {
          return x.id === id ?
          {...x, isHeld:!x.isHeld}
          : x
        }))
  }


  // console.log(allNewDice())
  const diceElements = dice.map((x) => <Die value={x.value} key={x.id} isHeld={x.isHeld} id = {x.id} holdDice={holdDice} />)
  function handleRoll() {
    if(!tenzies)
    {
      setDice(old => old.map(x=>
      {
        return x.isHeld === true ?
        {...x}
        : {...x, value : Math.floor((Math.random() * 6) + 1)}
      }))
    }
      else
      {
          setDice(allNewDice())
          setTenzies(false)
      }
  }


  return (
    <>
    {tenzies && <Confetti/>}
    <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="cont">
        {diceElements}
      </div>
      <button className="rollbutton" onClick={handleRoll}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
    </>
  );
}

export default App;
