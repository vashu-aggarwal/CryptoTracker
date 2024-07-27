import { MenuItem, Select }from '@mui/material';
import React from 'react';
import './style.css'

export default function SelectDays({days,handleDaysChange,noPtag}) {

  return (
    <div className='select-days' style={{ marginBottom:"0" }}>  
        {!noPtag && <p>Price change in the last</p>}   
        <Select
          className='select-change'
          value={days}
          onChange={(e)=>handleDaysChange(e)}
          sx={{
            height: "2.5rem",
            color: "var(--white)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--white)",
            },
            "& .MuiSvgIcon-root": {
              color: "var(--white)",
            },
            "&:hover": {
              "&& fieldset": {
                borderColor: "#3a80e9",
              },
            },
          }}
        >
        <MenuItem value={7}>7 Days</MenuItem>
        <MenuItem value={30}>30 Days</MenuItem>
        <MenuItem value={60}>60 Days</MenuItem>
        <MenuItem value={90}>90 Days</MenuItem>
        <MenuItem value={120}>120 Days</MenuItem>
        </Select>
    </div>
  );
}