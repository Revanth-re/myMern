import React, { useState, useEffect } from "react";

const CurrentSales = ({ datas}) => {

  console.log(datas,"datas");
  
    
  const [allItems, setAllItems] = useState([]);
  console.log(datas,"data");

  return (
    <div>
      <h1 className="font-2xl">CurrentSales:{datas}</h1>
       {/* <h1 className="font-2xl">CurrentSales:{alldata}</h1> */}

    </div>
  );
};

export default CurrentSales;
