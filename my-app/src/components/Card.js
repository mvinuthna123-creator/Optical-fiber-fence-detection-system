import "../css/Card.css";

function Card({ title, value, type = "primary", subtext }) {
  return (
    <div className={`card card-${type}`}>
      <div>
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
      {subtext && <div className="card-subtext">{subtext}</div>}
    </div>
  );
}

export default Card;