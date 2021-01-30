import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxillary";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.redirectPath !== "/") {
      this.props.onInitBurgerCheck();
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = updateObject(this.state.controls, {
      [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: true,
      }),
    });

    // let formIsValid = true;
    // for (let inputIdentifiers in updatedcontrolsForm) {
    //   formIsValid = updatedcontrolsForm[inputIdentifiers].valid && formIsValid;
    // }
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    // console.log(this.props);
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({ id: key, config: this.state.controls[key] });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        valueType={formElement.config.elementConfig.placeholder}
      />
    ));

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.redirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <Aux>
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success">
                {this.state.isSignUp ? "SIGNUP" : "SIGNIN"}
              </Button>
            </form>
            <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
              switch to {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
            </Button>
          </Aux>
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token != null,
    redirectPath: state.auth.authRedirectpath,
    building: state.burger.building,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onInitBurgerCheck: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Auth);
