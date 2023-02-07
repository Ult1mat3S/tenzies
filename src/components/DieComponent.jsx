export default function DieComponent(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59e391" : "white",
  };

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-number">{props.value}</h2>
    </div>
  );
}
