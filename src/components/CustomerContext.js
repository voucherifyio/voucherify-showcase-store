import React, { Component } from "react";
import storeCustomers from "../storeCustomers.json";
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
    fetchingCustomer: readValueFromLocalStorage("fetchingCustomer") || false,
    publishedVouchers: readValueFromLocalStorage("publishedVouchers") || null,
    uniqueVoucher: readValueFromLocalStorage("vouchers") || null,
    campaigns: readValueFromLocalStorage("campaigns") || null,
    sessionCode: readValueFromLocalStorage("sessionCode") || null,
  };
};

class CustomerProvider extends Component {
  state = {
    customer: null,
    sidebar: true,
    customers: null,
    fetchingCustomer: true,
    fetchingCampaigns: true,
    sessionCode: null,
    publishedVouchers: null,
    campaigns: null,
    vouchers: null,
    copiedCode: null,
    voucherOrCampaign: null,
  };

  componentDidMount() {
    this.setState(loadItemsFromLocalStorage());
    this.init();
  }

  init = async () => {
    try {
      const session = await fetch(`${process.env.REACT_APP_API_URL}/init`, {
        credentials: "include",
      }).then((response) => response.json());

      if (session.coupons.length === 0) {
        this.setState({
          sessionCode: session.session,
          publishedVouchers: readValueFromLocalStorage("publishedVouchers"),
        });
      } else {
        this.setState({
          sessionCode: session.session,
          publishedVouchers: session.coupons,
        });
        localStorage.setItem(
          "sessionCode",
          JSON.stringify(this.state.sessionCode)
        );
        localStorage.setItem(
          "publishedVouchers",
          JSON.stringify(this.state.publishedVouchers)
        );
      }
      this.getCustomers(); // catch() won't catch these errors. shall we await on these?
      this.getCampaigns();
      this.getVouchers();
    } catch (e) {
      console.log(e); // does it say what method caused the error? same question for the other console.logs below
    }
  };

  getCustomers = async () => {
    try {
      this.setState({ fetchingCustomer: true });
      const customers = await Promise.all(
        storeCustomers.map((customer) => {
          return fetch(
            `${process.env.REACT_APP_API_URL}/customer/${this.state.sessionCode}${customer.source_id}`,
            {
              include: "credentials",
            }
          ).then((cust) => cust.json());
        })
      );
      this.setState({
        customers: customers,
        fetchingCustomer: false,
      });
      localStorage.setItem("customers", JSON.stringify(customers));
    } catch (e) {
      console.log(e);
    }
  };

  getCampaigns = async () => {
    try {
      this.setState({ fetchingCampaigns: true });
      const campaigns = await fetch(
        `${process.env.REACT_APP_API_URL}/campaigns`,
        {
          include: "credentials",
        }
      ).then((camps) => camps.json());

      // const campaigns = allCampaigns.campaigns.filter(
      //   (campaign) => campaign.metadata.demostore === true
      // );

      this.setState({
        campaigns: campaigns,
        fetchingCampaigns: false,
      });

      localStorage.setItem("campaigns", JSON.stringify(campaigns));
    } catch (e) {
      console.log(e);
    }
  };

  //Simple sleep function for fetching data
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  getVouchers = async () => {
    try {
      this.setState({ fetchingCampaigns: true });
      const vouchers = await fetch(
        `${process.env.REACT_APP_API_URL}/vouchers`,
        {
          include: "credentials",
        }
      ).then((resp) => resp.json());

      this.setState({
        vouchers: vouchers,
        fetchingCampaigns: false,
      });

      localStorage.setItem("vouchers", JSON.stringify(vouchers));
    } catch (e) {
      console.log(e);
    }
  };

  setVoucherOrCampaign = (name) => {
    this.setState({ voucherOrCampaign: name });
  };

  setCustomer = async (id) => { // why is it called setCustomer if it GETs a customer from the server? loadCustomer(id)  or fetchCustomer(id)?
    try {
      //Get customer data, start spinner
      this.setState({ fetchingCustomer: true });
      let customer = await fetch(
        `${process.env.REACT_APP_API_URL}/customer/${id}`,
        {
          credentials: "include",
        }
      ).then((x) => x.json());
      this.setState({
        customer: customer,
        fetchingCustomer: false,
      });
      localStorage.setItem("customer", JSON.stringify(customer));
      localStorage.setItem("fetchingCustomer", JSON.stringify(false));
    } catch (e) {
      console.log(e);
    }
  };

  getCode = (campaign) => {
    let customer = this.state.customer.source_id;
    let publishedVouchers = this.state.publishedVouchers;

    let customerVouchers = publishedVouchers.find(
      (voucher) => voucher.customer === customer
    );
    let customerCampaigns = customerVouchers.campaigns.find(
      (camp) => camp.campaign === campaign
    );
    return customerCampaigns.code;
  };

  updateCustomerData = async (id) => {
    try {
      //Get customer data, start spinner
      this.setState({ fetchingCustomer: true, fetchingCampaigns: true });
      let customer = await fetch(
        `${process.env.REACT_APP_API_URL}/customer/${id}`,
        {
          credentials: "include",
        }
      ).then((x) => x.json());
      //Check if customer data has not updated
      if (
        customer.summary.orders.total_amount ===
        this.state.customer.summary.orders.total_amount
      ) {
        //If true -> wait
        await this.sleep(5000);
        await this.updateCustomerData(id);
      } else {
        await this.setCustomer(id);
        await this.getCampaigns();
        await this.getVouchers();
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <CustomerContext.Provider
        value={{
          ...this.state,
          setCustomer: this.setCustomer,
          getCustomers: this.getCustomers,
          getRedemptions: this.getRedemptions,
          updateCustomerData: this.updateCustomerData,
          getCode: this.getCode,
          getCampaigns: this.getCampaigns,
          getVouchers: this.getVouchers,
          setVoucherOrCampaign: this.setVoucherOrCampaign,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

const CustomerConsumer = CustomerContext.Consumer;

export { CustomerProvider, CustomerConsumer };
