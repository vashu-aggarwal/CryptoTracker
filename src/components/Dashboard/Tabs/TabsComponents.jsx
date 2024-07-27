import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { createTheme,ThemeProvider } from '@mui/material';
import Grids from '../Grid/Grids';
import "./style.css"
import Lists from '../List/Lists';

export default function TabsComponents({coins}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme=createTheme({
    palette: {
      primary: {
        main: '#3a80e9',
      },
      
    },
  })
  const style = {
    color: "var(--white)",
    width:"50vw",
    fontSize:"1.2rem",
    fontFamily: "Inter,sans-serif",
    fontWeight: 600,
    textTransform: "capitalize",
  };
  return (
    <ThemeProvider theme={theme} >
      <TabContext value={value}>
          <TabList onChange={handleChange} variant='fullWidth'>
            <Tab label="Grid" value="grid" sx={style}/>
            <Tab label="List" value="list" sx={style}/>
          </TabList>

        <TabPanel value="grid">
           <div className='grid-flex'>
              {coins.map((coin,index)=>{
                return (
                    <Grids coin={coin} key={index}/>
                );
              })}
            </div>
        </TabPanel>
        <TabPanel value="list">
        <table className="list-flex">
              {coins.map((item,index)=>{
                return (
                  <div key={index}>
                     <Lists coin={item} key={index} />
                  </div>
                );
              })}        
            </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
