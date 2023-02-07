import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import DieComponent from "./components/DieComponent";

export default function App() {
  const [diceState, setDiceState] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(true);

  useEffect(() => {
    const allHeld = diceState.every((diceState) => diceState.isHeld);
    const firstValue = diceState[0].value;
    const allSameValue = diceState.every(
      (diceState) => diceState.value === firstValue
    );
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [diceState]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDice(id) {
    setDiceState((prevDice) =>
      prevDice.map((diceElement) => {
        return diceElement.id === id
          ? { ...diceElement, isHeld: !diceElement.isHeld }
          : diceElement;
      })
    );
  }

  function resetGame() {
    setTenzies(false);
    setDiceState(allNewDice());
  }

  function rollDice() {
    if (tenzies == true) {
      resetGame();
    }
    setDiceState((prevDiceRoll) =>
      prevDiceRoll.map((diceElement) => {
        return diceElement.isHeld ? diceElement : generateNewDie();
      })
    );
  }

  const diceElements = diceState.map((diceElement) => (
    <DieComponent
      value={diceElement.value}
      key={diceElement.id}
      isHeld={diceElement.isHeld}
      holdDice={() => holdDice(diceElement.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements} </div>
      <button className="dice-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
