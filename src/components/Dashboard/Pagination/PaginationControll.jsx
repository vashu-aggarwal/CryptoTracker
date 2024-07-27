import React, { useState } from 'react'
import Pagination from "@mui/material/Pagination";
import "./style.css"
const PaginationControll = ({page,handlePageChange}) => {
  let mybutton = document.getElementById("top-btn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
  }
  return (
    <div className='pagination-div'
    id="top-btn"
    onClick={() => {
       document.body.scrollTop = 0;
       document.documentElement.scrollTop = 0;
     }} >
      <Pagination
        sx={{
          "& .MuiPaginationItem-text": {
            color: "#fff !important",
            border: "1px solid var(--grey)",
          },
          "& .MuiPaginationItem-text:hover": {
            backgroundColor: "transparent !important",
          },
          "& .Mui-selected  ": {
            backgroundColor: "var(--blue)",
            borderColor: "var(--blue)",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
        count={10}
        page={page}
        onChange={(e,v)=>handlePageChange(e,v)
        
        }
      />
    </div>
  )
}

export default PaginationControll
