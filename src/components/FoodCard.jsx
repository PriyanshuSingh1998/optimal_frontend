import "./FoodCard.css";

function FoodCard(props) {
  return (
    <div className="food-card">

      <img
        src={props.image}
        alt={props.name}
      />

      <div className="food-info">
        <h2>{props.name}</h2>

        <p className="category">{props.category}</p>

        <div className="price-row">
          <h3>₹{props.price}</h3>

          <span>⭐ 4.5</span>
        </div>

        <button onClick={() => props.addToCart(props.id)}>
          🛒 Add to Cart
        </button>
      </div>

    </div>
  );
}

export default FoodCard;