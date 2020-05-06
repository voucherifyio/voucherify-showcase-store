import React, { Component } from "react";
import { storeCustomers } from "../data";
import _ from "lodash";

const CustomerContext = React.createContext();

class CustomerProvider extends Component {
  state = {
    customer: null,
    sidebar: true,
  };

  componentDidMount() {}

  setCustomer = (name) => {
    const customer = _.cloneDeep(
      storeCustomers.find((customer) => customer.name === name)
    );
    this.setState({
      customer: customer,
    });
  };

  setSideBar = () => {
    let value = this.state.sidebar;
    this.setState({
      sidebar: !value,
    });
  };

  render() {
    return (
      <CustomerContext.Provider
        value={{
          ...this.state,
          setCustomer: this.setCustomer,
          setSideBar: this.setSideBar,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

const CustomerConsumer = CustomerContext.Consumer;

export { CustomerProvider, CustomerConsumer };
