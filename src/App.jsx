import { useState } from "react";
import DieComponent from "./components/DieComponent";

export default function App() {
  const [diceState, setDiceState] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const diceNumbers = diceState.map((num, index) => {
    return <DieComponent value={num} key={index} />;
  });

  return (
    <main>
      <div className="dice-container">{diceNumbers}</div>
    </main>
  );
}
