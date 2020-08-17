import React from 'react';
import { ProductConsumer } from '../Context/Context';
import _ from 'lodash';
import SidebarCampaignDetails from './SidebarCampaignDetails';
import SidebarVoucherDetails from './SidebarVoucherDetails';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SidebarQualifications from './SidebarQualifications';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    width: '100%',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    padding: 20,
  },
}))(MuiAccordionDetails);

const SidebarContent = () => {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="list-group list-group-flush">
      <ProductConsumer>
        {(ctx) => {
          let customerDate = '';
          let downloadCustomerData = '';
          if (ctx.customerSelectedCustomer) {
            customerDate = new Date(
              ctx.customerSelectedCustomer.summary.orders.last_order_date
            );
            downloadCustomerData =
              'data: text/json;charset=utf-8,' +
              encodeURIComponent(JSON.stringify(ctx.customerSelectedCustomer));
          }
          const customerVouchers = _.orderBy(
            ctx.customerVouchers,
            ['metadata']['demostoreOrder'],
            ['asc']
          );
          const customerCampaigns = _.orderBy(
            ctx.customerCampaigns,
            ['metadata']['demostoreOrder'],
            ['asc']
          );

          return (
            <>
              {!ctx.customerAvailableCustomers ||
              ctx.fetchingCustomer ? (
                <div className="d-flex my-3 justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <div className="storeSidebar-select-customer">
                    <Form.Control
                      as="select"
                      id="storeCustomers"
                      onChange={(e) => {
                        ctx.getCustomer(e.target.value);
                      }}
                      value={
                        (ctx.customerSelectedCustomer || {}).source_id || 'DEFAULT'
                      }
                    >
                      <option value="DEFAULT" disabled>
                        Select customer
                      </option>
                      {ctx.customerAvailableCustomers.map((customer) => (
                        <option key={customer.name} value={customer.source_id}>
                          {customer.name} ({customer.metadata.country})
                        </option>
                      ))}
                    </Form.Control>
                    <a href={downloadCustomerData} download="customerData.json">
                      <Tooltip title="Download data">
                        <IconButton>
                          <GetAppIcon />
                        </IconButton>
                      </Tooltip>
                    </a>
                  </div>
                  {!_.isEmpty(ctx.customerSelectedCustomer) && (
                    <>
                      <div className="storeSidebar-content">
                        <p>
                          Location:{' '}
                          <span className="storeSidebar-content-data">
                            {ctx.customerSelectedCustomer.address.country}
                          </span>
                        </p>
                        <p>
                          Total amount spent:{' '}
                          <span className="storeSidebar-content-data">
                            $
                            {(
                              ctx.customerSelectedCustomer.summary.orders
                                .total_amount / 100
                            ).toFixed(2)}
                          </span>
                        </p>
                        <p>
                          Last order date:{' '}
                          <span className="storeSidebar-content-data">
                            {('0' + customerDate.getDate()).slice(-2)}.
                            {('0' + (customerDate.getMonth() + 1)).slice(-2)}.
                            {customerDate.getFullYear()} @{' '}
                            {('0' + customerDate.getHours()).slice(-2)}:
                            {('0' + customerDate.getMinutes()).slice(-2)}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
              {!_.isEmpty(ctx.customerCampaigns) &&
                !_.isEmpty(ctx.customerVouchers) &&
                !_.isEmpty(ctx.customerSelectedCustomer) && 
                (
                  <>
                  <p className="storeSidebar-heading my-1">
                      Customer Qualifications
                    </p>
                    <SidebarQualifications key="qualifications" ctx={ctx} />
                    <p className="storeSidebar-heading">
                      Public Codes{' '}
                      <span className="campaigns-count">
                        ({ctx.customerVouchers.length})
                      </span>
                    </p>
                    {ctx.fetchingCampaigns ? (
                      <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <div>
                        {customerVouchers.map((voucher) => (
                          <Accordion
                            square
                            key={voucher.metadata.demostoreName}
                            expanded={
                              expanded === `${voucher.metadata.demostoreName}`
                            }
                            onChange={handleChange(
                              `${voucher.metadata.demostoreName}`
                            )}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`${voucher.metadata.demostoreName}-content`}
                              id={`${voucher.metadata.demostoreName}-header`}
                              className="campaign-box"
                            >
                              <p className="campaign-name">
                                {voucher.metadata.demostoreName}
                              </p>
                            </AccordionSummary>
                            <AccordionDetails className="bg-light">
                              <SidebarVoucherDetails
                                voucher={voucher}
                                code={voucher.code}
                              />
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </div>
                    )}
                    <p className="storeSidebar-heading">
                      Personal Codes{' '}
                      <span className="campaigns-count">
                        ({ctx.customerCampaigns.length})
                      </span>
                    </p>
                    {ctx.fetchingCampaigns ? (
                      <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <div>
                        {customerCampaigns.filter((camp) => !_.isEmpty(camp.coupons)).map((campaign) => (
                          <Accordion
                            square
                            key={campaign.name}
                            expanded={expanded === `${campaign.name}`}
                            onChange={handleChange(`${campaign.name}`)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`${campaign.metadata.demostoreName}-content`}
                              id={`${campaign.metadata.demostoreName}-header`}
                              className="campaign-box"
                            >
                              <p className="campaign-name">
                                {campaign.metadata.demostoreName}
                              </p>
                            </AccordionSummary>
                            <AccordionDetails className="bg-light">
                              <SidebarCampaignDetails
                                campaign={campaign}
                                code={
                                  campaign.coupons.find(
                                    (coupon) =>
                                      coupon.customerSelectedCustomer ===
                                      ctx.customerSelectedCustomer.source_id
                                  ).customerDataCoupon
                                }
                              />
                            </AccordionDetails>
                          </Accordion>
                        ))}
                        {customerCampaigns.filter((camp) => _.isEmpty(camp.coupons)).map((campaign) => (
                          <Accordion
                            square
                            key={campaign.name}
                            expanded={expanded === `${campaign.name}`}
                            onChange={handleChange(`${campaign.name}`)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`${campaign.metadata.demostoreName}-content`}
                              id={`${campaign.metadata.demostoreName}-header`}
                              className="campaign-box"
                            >
                              <p className="campaign-name">
                                {campaign.metadata.demostoreName}
                              </p>
                            </AccordionSummary>
                            <AccordionDetails className="bg-light">
                              <SidebarCampaignDetails
                                campaign={campaign}
                                
                              />
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </div>
                    )}
                  </>
                )}
            </>
          );
        }}
      </ProductConsumer>
    </div>
  );
};

export default SidebarContent;
