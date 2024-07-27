import React from 'react';
import { MenuItem, Select } from "@mui/material";
import SelectDays from '../../Coins/SelectDays/SelectDays';
import './style.css';


const SelectCoin = ({allCoins, crypto1, crypto2,handleCoinChange,days, handleDaysChange }) => {
  

  const style = {
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
  };

  



  return (
    <div className="select-coins-div">
      <div className="select-flex">
        <p>Crypto 1</p>
        <Select
          value={crypto1}
          
          onChange={(event) => handleCoinChange(event, false)}
          sx={style}
        >
          {allCoins
            .filter((item) => item.id != crypto2)
            .map((item, i) => (
              <MenuItem value={item.id} key={i}>{item.name}</MenuItem>
            ))}
        </Select>
      </div>
      <div className="select-flex">
        <p>Crypto 2</p>
        <Select
          value={crypto2}
          onChange={(event) => handleCoinChange(event, true)}
          sx={style}
        >
          {allCoins
            .filter((item) => item.id != crypto1)
            .map((item, i) => (
              <MenuItem value={item.id} key={i}>{item.name}</MenuItem>
            ))}
        </Select>
      </div>
      <SelectDays days={days} handleDaysChange={handleDaysChange}/>
    </div>
  );
};

export default SelectCoin;
