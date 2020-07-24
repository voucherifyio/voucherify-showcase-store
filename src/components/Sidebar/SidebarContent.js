import React from 'react';
import {CustomerConsumer} from '../CustomerContext';
import _ from 'lodash';
import CampaignDetails from './CampaignDetails';
import VoucherDetails from './VoucherDetails';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Accordion = withStyles({
  root: {
    'border': '1px solid rgba(0, 0, 0, .125)',
    'boxShadow': 'none',
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
    'backgroundColor': 'rgba(0, 0, 0, .03)',
    'borderBottom': '1px solid rgba(0, 0, 0, .125)',
    'marginBottom': -1,
    'minHeight': 56,
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
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
  return (
    <div className="list-group list-group-flush">
      <CustomerConsumer>
        {(ctx) => {
          let customerDate = '';
          let downloadCustomerData = '';
          if (ctx.customer) {
            customerDate = new Date(
                ctx.customer.summary.orders.last_order_date,
            );
            downloadCustomerData =
              'data: text/json;charset=utf-8,' +
              encodeURIComponent(JSON.stringify(ctx.customer));
          }
          const vouchers = _.orderBy(ctx.vouchers, ['metadata']['demostoreOrder'],['asc']);
          const campaigns = _.orderBy(ctx.campaigns, ['metadata']['demostoreOrder'],['asc']);

          return (
            <>
              {!ctx.customers || ctx.fetchingCustomer ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <div className="sidebar-select-customer">
                    <Form.Control
                      as="select"
                      id="storeCustomers"
                      onChange={(e) => {
                        ctx.loadCustomer(e.target.value);
                      }}
                      value={(ctx.customer || {}).source_id || 'DEFAULT'}
                      className=""
                    >
                      <option value="DEFAULT" disabled>
                        Select customer
                      </option>
                      {ctx.customers.map((customer) => (
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
                  {!_.isEmpty(ctx.customer) && (
                    <>
                      <div className="sidebar-content">
                        <p>
                          Location:{' '}
                          <span className="sidebar-content-data">
                            {ctx.customer.address.country}
                          </span>
                        </p>
                        <p>
                          Total amount spent:{' '}
                          <span className="sidebar-content-data">
                            $
                            {(
                              ctx.customer.summary.orders.total_amount / 100
                            ).toFixed(2)}
                          </span>
                        </p>
                        <p>
                          Last order date:{' '}
                          <span className="sidebar-content-data">
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
              {!_.isEmpty(ctx.campaigns) &&
                !_.isEmpty(ctx.vouchers) &&
                !_.isEmpty(ctx.customer) && (
                <>
                  <p className="sidebar-heading">
                      Public Codes{' '}
                    <span className="campaigns-count">
                        ({ctx.vouchers.length})
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
                        {vouchers.map((voucher) => (
                          <Accordion
                            square
                            key={voucher.metadata.demostoreName}
                            expanded={
                              expanded === `${voucher.metadata.demostoreName}`
                            }
                            onChange={handleChange(
                                `${voucher.metadata.demostoreName}`,
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
                              <VoucherDetails
                                voucher={voucher}
                                code={voucher.code}
                              />
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </div>
                    )}
                  <p className="sidebar-heading">
                      Personal Codes{' '}
                    <span className="campaigns-count">
                        ({ctx.campaigns.length})
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
                        {campaigns.map((campaign) => (
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
                              <CampaignDetails
                                campaign={campaign}
                                code={ctx.getCode(campaign.name)}
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
      </CustomerConsumer>
    </div>
  );
};

export default SidebarContent;
