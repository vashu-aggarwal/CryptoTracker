import React from 'react';
import "./style.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Tooltip } from "@mui/material";
import { ConvertNumber } from '../../../functions/ConvertNumber';
import { Link } from 'react-router-dom';

const Lists = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`} className='list-link'>
      <div className='list-row'>
        <Tooltip title="Logo">
          <div className='td-image'>
            <img src={coin.image} className='coin-logo coin-image-td' alt={`${coin.name} logo`} />
          </div>
        </Tooltip>
        <div className="td-info">
          <div className='name-col'>
            <Tooltip title="symbol">
              <p className='coin-symbol td-p td-p1'>{coin.symbol}</p>
            </Tooltip>
            <Tooltip title="Name">
              <p className='coin-name td-p td-p2'>{coin.name}</p>
            </Tooltip>
          </div>
        </div>
        <Tooltip title="Price Change">
          <div className='chip-flex td-chip-flex'>
            {coin.price_change_percentage_24h > 0 ? (
              <>
                <div className='price-chip td-price-chip'>
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip td-icon'><TrendingUpRoundedIcon /></div>
              </>
            ) : (
              <>
                <div className='price-chip chip-red td-price-chip'>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip chip-red td-icon'><TrendingDownRoundedIcon /></div>
              </>
            )}
          </div>
        </Tooltip>
        <Tooltip title="Current Price">
          <div className='td-current-price'>
            <h3 className="coin-price td-center-align" style={{ color: coin.price_change_percentage_24h > 0 ? "var(--green)" : "var(--red)" }}>
              ${coin.current_price.toLocaleString()}
            </h3>
          </div>
        </Tooltip>
        <Tooltip title="Total Volume">
          <div className='total_volume td-right-align td-total-volume'>
            ${coin.total_volume.toLocaleString()}
          </div>
        </Tooltip>
        <Tooltip title="Market Cap">
          <div className='desktop-td-mkt td-marketCap'>
            <p className='total_volume td-right-align'>
              ${coin.market_cap.toLocaleString()}
            </p>
          </div>
        </Tooltip>
        <Tooltip title="Market Cap">
          <div className='mobile-td-mkt'>
            <p className='total_volume td-right-align'>
              ${ConvertNumber(coin.market_cap)}
            </p>
          </div>
        </Tooltip>
      </div>
    </Link>
  );
}

export default Lists;
