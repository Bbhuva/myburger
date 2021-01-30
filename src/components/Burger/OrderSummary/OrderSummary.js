import React, { Component } from "react";
import Aux from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";

class orderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span key={igKey} style={{ textTransform: "capitalize" }}>
              {igKey}
            </span>
            :{this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A burger with following ingredients </p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to Checkout</p>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default orderSummary;
