export default function DieComponent(props) {
  return (
    <div className="die-face">
      <h2 className="die-number">{props.value}</h2>
    </div>
  );
}
