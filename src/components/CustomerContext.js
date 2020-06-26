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
    customerRedemptions:
      readValueFromLocalStorage("customerRedemptions") || null,
    publishedVouchers: readValueFromLocalStorage("publishedVouchers") || null,
    uniqueVoucher: readValueFromLocalStorage("vouchers") || null,
    campaigns: readValueFromLocalStorage("campaigns") || null,
  };
};

class CustomerProvider extends Component {
  state = {
    customer: null,
    sidebar: true,
    customers: [],
    fetchingCustomer: true,
    customerRedemptions: null,
    fetchingCampaigns: true,
    sessionCode: "",
    publishedVouchers: null,
    campaigns: null,
    vouchers: null,
    copiedCode: null,
    voucherOrCampaing: null,
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

      let sessionCode = session.session;
      let publishedVouchers = session.coupons;
      this.setState({
        sessionCode: sessionCode,
        publishedVouchers: publishedVouchers,
      });
      localStorage.setItem("sessionCode", JSON.stringify(sessionCode));
      localStorage.setItem(
        "publishedVouchers",
        JSON.stringify(publishedVouchers)
      );
      this.getCustomers();
      this.getCampaigns();
      this.getVouchers();
    } catch (e) {
      console.log(e);
    }
  };

  createCustomers = async () => {
    try {
      storeCustomers.forEach(async (customer) => {
        await fetch(
          `${process.env.REACT_APP_API_URL}/create-customer/${this.state.sessionCode}${customer.source_id}`,
          {
            credentials: "include",
          }
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  getCopiedCode = (code) => {
    this.setState({ copiedCode: code });
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

  getRedemptions = async (id) => {
    const customerRedemptions = {};
    let redemptions = await fetch(
      `${process.env.REACT_APP_API_URL}/redemptions/${id}`,
      {
        credentials: "include",
      }
    ).then((redemptions) => redemptions.json());

    // Count reedemed codes
    for (let i = 0; i < redemptions.length; i++) {
      customerRedemptions[redemptions[i].voucher.code] =
        (customerRedemptions[redemptions[i].voucher.code] || 0) + 1;
    }
    Object.keys(customerRedemptions).map((key) => ({
      [key]: customerRedemptions[key],
    }));

    return redemptions;
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

  setVoucherOrCampaing = (name) => {
    this.setState({ voucherOrCampaing: name });
  };

  setCustomer = async (id) => {
    try {
      //Get customer data, start spinner
      this.setState({ fetchingCustomer: true });
      let customer = await fetch(
        `${process.env.REACT_APP_API_URL}/customer/${id}`,
        {
          credentials: "include",
        }
      ).then((x) => x.json());
      let customerRedemptionsList = await this.getRedemptions(id);
      this.setState({
        customer: customer,
        fetchingCustomer: false,
        customerRedemptions: customerRedemptionsList,
      });
      localStorage.setItem("customer", JSON.stringify(customer));
      localStorage.setItem("fetchingCustomer", JSON.stringify(false));
      localStorage.setItem(
        "customerRedemptions",
        JSON.stringify(customerRedemptionsList)
      );
      console.log(customer)
    } catch (e) {
      console.log(e);
    }
  };

  getCode = (camp_name) => {
    let customer = this.state.customer.source_id;
    let campaing = camp_name;

    let customerVouchers = this.state.publishedVouchers.find(
      (voucher) => voucher.customer === customer
    );

    let customerCampaigns = customerVouchers.campaings.find(
      (camp) => camp.campaign === campaing
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
        this.updateCustomerData(id);
      } else {
        this.setCustomer(id);
        this.getCampaigns();
        this.getVouchers();
      }
    } catch (e) {
      console.log(e);
    }
  };

  getCustomer = () => {
    return this.state.customers.find(
      (customer) => this.state.customer === customer.name
    );
  };

  render() {
    return (
      <CustomerContext.Provider
        value={{
          ...this.state,
          setCustomer: this.setCustomer,
          getCustomer: this.getCustomer,
          getCustomers: this.getCustomers,
          getRedemptions: this.getRedemptions,
          updateCustomerData: this.updateCustomerData,
          getCode: this.getCode,
          getCampaigns: this.getCampaigns,
          getCopiedCode: this.getCopiedCode,
          getVouchers: this.getVouchers,
          setVoucherOrCampaing: this.setVoucherOrCampaing,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

const CustomerConsumer = CustomerContext.Consumer;

export { CustomerProvider, CustomerConsumer };
