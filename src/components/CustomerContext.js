import React, { Component } from "react";
import { storeCustomers } from "../data";
import _ from "lodash";

const CustomerContext = React.createContext();

const readValueFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {}
  }
};

const loadItemsFromLocalStorage = () => {
  return {
    customer: readValueFromLocalStorage("customer") || null,
  };
};


class CustomerProvider extends Component {
  state = {
    customer: null,
    sidebar: true,
  };

  componentDidMount() {
    this.setState(loadItemsFromLocalStorage())
  }

  setCustomer = (name) => {
    const customer = _.cloneDeep(
      storeCustomers.find((customer) => customer.name === name)
    );
    this.setState({
      customer: customer,
    });
    localStorage.setItem("customer", JSON.stringify(customer));
  };

  render() {
    return (
      <CustomerContext.Provider
        value={{
          ...this.state,
          setCustomer: this.setCustomer,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

const CustomerConsumer = CustomerContext.Consumer;

export { CustomerProvider, CustomerConsumer };
