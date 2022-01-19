import React, { useState } from 'react'
import data from "./test";
import { useHistory } from 'react-router-dom';
import CustomDataTable from "./../../components/CustomDataTable";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cibEx } from '@coreui/icons'
import WithdrawalRequests from './WithdrawalRequests';
import Transactions from './Transactions'
import { styled } from '@mui/material/styles';
import {useSelector } from 'react-redux'

import {
  CBadge,
  CCard,
} from '@coreui/react'

const Payments = () => {

  const [value, setValue] = useState(0);
  const newWithdrawalRequests = useSelector((state) => state.withdrawalRequests.summary.newWithdrawalRequests);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      display: 'none',
      maxWidth: 0,
      width: '100%',
      backgroundColor: 'trasparent',
    },
  });

  const StyledTab = styled((props) => <Tab  {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontSize: theme.typography.pxToRem(16),
      marginRight: theme.spacing(1),
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-selected': {
        color: '#000015',
    marginTop: '10px',
    borderTop: '3px solid #f9b115',
    borderRight: '3px solid #f9b115',
    borderLeft: '3px solid #f9b115',
    borderRadius: '5px 5px 0px 0px',
    background: '#fff',
    fontSize: 18
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'transparent',
      },
    }),
  );

  return (
    <CCard>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ backgroundColor:'#1a2231', padding: '0 5px'}}>
          <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <StyledTab
              label={(
                <span>Payments Requets
                 {newWithdrawalRequests.value > 0 && <CBadge color="danger" shape="rounded-pill">{newWithdrawalRequests.value}</CBadge>}
                </span>)}
                {...a11yProps(0)}
            />
            <StyledTab label="Transactions" {...a11yProps(1)} />
          </StyledTabs>
        </Box>
        <TabPanel value={value} index={0}>
        <WithdrawalRequests/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Transactions/>
        </TabPanel>
      </Box>
    </CCard>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default Payments
