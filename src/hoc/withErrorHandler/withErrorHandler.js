import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxillary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      this.requestInter = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.responseInter = axios.interceptors.response.use(
        (res) => {
          return res;
        },
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInter);
      axios.interceptors.response.eject(this.responseInter);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
