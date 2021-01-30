import React, { Component } from "react";
import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.props.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const newPrice = this.state.totalPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.ingredients[type];
  //   if (oldCount > 0) {
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //       ...this.props.ingredients,
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceSubstraction = INGREDIENT_PRICES[type];
  //     const newPrice = this.state.totalPrice - priceSubstraction;
  //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //     this.updatePurchaseState(updatedIngredients);
  //   } else {
  //     alert("No " + type + " found ");
  //   }
  // };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((newsum, el) => {
        return newsum + el;
      }, 0);

    return sum > 0;
  };

  purchasingHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      if (this.props.building) {
        this.props.onSetRedirectPath("/checkout");
      }
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.props.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.props.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
      // search: "?" + queryString,
    });
  };

  render() {
    // console.log(this.props.ingredients);
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      "Ingredients can't be loaded "
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            disabled={disabledInfo}
            ordered={this.purchasingHandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuth: state.auth.token !== null,
    building: state.burger.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onInitIngredients: (ingredients) =>
    //   dispatch({
    //     type: actionTypes.INITING,
    //     payload: { Ingredients: ingredients },
    //   }),
    addIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
    removeIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
