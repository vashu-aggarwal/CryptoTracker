import React from 'react'
import { createTheme,ThemeProvider } from '@mui/material';
import "./App.css";
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import CoinPage from './pages/CoinPage';
import ComparePage from './pages/ComparePage';
import {useEffect} from "react";
import Watchlist from './pages/Watchlist';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  var cursor;
  var cursorPointer;

  useEffect(() => {
    cursor = document.getElementById("cursor");
    cursorPointer = document.getElementById("cursor-pointer");

    document.body.addEventListener("mousemove", function (e) {
      return (
        (cursor.style.left = e.clientX + "px"),
        (cursor.style.top = e.clientY + "px"),
        (cursorPointer.style.left = e.clientX + "px"),
        (cursorPointer.style.top = e.clientY + "px")
      );
    });

    document.body.addEventListener("mousedown", function (e) {
      return (
        (cursor.style.height = "0.2rem"),
        (cursor.style.width = "0.2rem"),
        (cursorPointer.style.height = "2rem"),
        (cursorPointer.style.width = "2rem")
      );
    });

    document.body.addEventListener("mouseup", function (e) {
      return (
        (cursor.style.height = "0.2rem"),
        (cursor.style.width = "0.2rem"),
        (cursorPointer.style.height = "2rem"),
        (cursorPointer.style.width = "2rem")
      );
    });
  }, []);
  return (
    <div>
      <div className='cursor' id="cursor" />
      <div className="cursor-pointer" id="cursor-pointer" />
      <ToastContainer />
      <ThemeProvider theme={theme}>
         <BrowserRouter>
           <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/dashboard" element={<DashboardPage/>} />
              <Route path="/coin/:id" element={<CoinPage/>}></Route> 
              <Route path="/compare" element={<ComparePage/>}></Route>
             <Route path="/watchlist" element={<Watchlist/>}></Route> 
             
           </Routes>
         
         </BrowserRouter>
        </ThemeProvider>
    </div>
  );
}

export default App
