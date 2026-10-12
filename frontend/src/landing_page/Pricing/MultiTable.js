import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TableFirst from './TableFirst';
import TableTwo from './TableTwo';
import ThirdTable from './ThirdTable';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
     <div className='container'>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
          <Tab sx={{fontSize:{xs:"1.25rem",sm:"1.5rem",md:"2rem"},textTransform:"none",minHeight:44}} label="Equity" {...a11yProps(0)} />
          <Tab sx={{fontSize:{xs:"1.25rem",sm:"1.5rem",md:"2rem"},textTransform:"none",minHeight:44}} label="Currency" {...a11yProps(1)} />
          <Tab sx={{fontSize:{xs:"1.25rem",sm:"1.5rem",md:"2rem"},textTransform:"none",minHeight:44}} label="Commodity" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <TableFirst/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <TableTwo/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ThirdTable/>
      </CustomTabPanel>
    </Box>
    </div>
  );
}
