import React from 'react';
import SidebarCampaignDetails from './SidebarCampaignDetails';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const SidebarCampaigns = ({ campaign, handleChange, currentCustomer }) => {
  const [expanded, setExpanded] = React.useState('');

  return (
    <>
      <Accordion
        square
        key={campaign.name}
        expanded={expanded === campaign.name}
        onChange={handleChange(campaign.name)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${campaign.metadata.demostoreName}-content`}
          id={`${campaign.metadata.demostoreName}-header`}
          className="campaign-box"
        >
          <p className="campaign-name">{campaign.metadata.demostoreName}</p>
        </AccordionSummary>
        <AccordionDetails className="bg-light">
          <SidebarCampaignDetails
            campaign={campaign}
            code={
              campaign.coupons.find(
                (coupon) => coupon.currentCustomer === currentCustomer.source_id
              ).customerDataCoupon
            }
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default SidebarCampaigns;


SidebarCampaigns.propTypes = {
  campaign: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  currentCustomer: Proptypes.object.isRequired
};

