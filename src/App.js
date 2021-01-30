import React, { Component, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

// Lasyloading Manually
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

// Lasyloading with react
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onTryautoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route
          path="/auth"
          render={(props) => (
            <Suspense fallback={<div>Laoding...</div>}>
              <Auth {...props} />
            </Suspense>
          )}
        />
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route
            path="/orders"
            render={(props) => (
              <Suspense fallback={<div>Laoding...</div>}>
                <Orders {...props} />
              </Suspense>
            )}
          />
          <Route
            path="/auth"
            render={(props) => (
              <Suspense fallback={<div>Laoding...</div>}>
                <Auth {...props} />
              </Suspense>
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const stateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    onTryautoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(stateToProps, dispatchToProps)(App);
