import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Coininfo from '../components/Coins/Coininfo/Coininfo';
import LineChart from '../components/Coins/LineChart/LineChart';
import SelectDays from '../components/Coins/SelectDays/SelectDays';
import PriceType from '../components/Coins/PriceType/PriceType';
import Header from '../components/Common/Headers/Header';
import Loader from '../components/Common/Loader/Loader';
import Lists from '../components/Dashboard/List/Lists';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartData';
import { CoinObject } from '../functions/CoinObject';
import Button from '../components/Common/Buttons/Button';


const CoinPage = () => {
  const { id } = useParams();
  const [error,setError]=useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData,setChartData]=useState({ labels:[],datasets:[{}]});
  const [coin, setCoin] = useState({});
  const [days,setdays]=useState(30);
  const [priceType,setPriceType]=useState("prices");


 

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    setLoading(true);
    let coinData = await getCoinData(id,setError);
    console.log("Coin DATA>>>>", coinData);
    CoinObject(setCoin,coinData);
    if (coinData) {
      const prices = await getCoinPrices(id, days,priceType,setError);
      if (prices) {
            settingChartData(setChartData, prices);
            setLoading(false);
          }
      }
    };

    const handleDaysChange = async (event) => {
      setLoading(true);
      setdays(event.target.value);
      const prices = await getCoinPrices(id, event.target.value,priceType,setError);
      if (prices) {
        settingChartData(setChartData, prices);
        setLoading(false);
      }
    };

    const handlePriceTypeChange= async (event)=>{
      setLoading(true);
      setPriceType(event.target.value);
      const prices = await getCoinPrices(id, days,event.target.value,setError);
      if (prices) {
        settingChartData(setChartData, prices);
        setLoading(false);
      }
 };

  return (
    <>
      <Header />
      {!error && !loading && coin.id ? (
        <>
          <div className="grey-wrapper ">
            <Lists coin={coin} />
          </div>
          <div className="grey-wrapper ">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <LineChart chartData={chartData} priceType={priceType}/>
          </div>
          <Coininfo heading={coin.name} key={coin.id} desc={coin.desc}/>
        </>
      ) : error ?(
        <div>
          <h1 style={{textAlign:"center"}}>
          Sorry, Couldn't find the coin you're looking for 😞
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      ):(
        <Loader />
      )}
    </>
  );
}

export default CoinPage
