import React, { useEffect, useState } from 'react';
import "./App.css";
import Investors from "./components/investors/Investors";
import Manager from "./components/manager/Manager";

const Home = ({state, account}) => {


  // console.log(state);

  const [manager, setManager] = useState(false);
  const [investor, setInvestor] = useState(false);
  
  useEffect(()=>{
    setInvestor(false);
    setManager(false);
  },[])
      
  // console.log(state.contract);
//code for account balance
  return (
    <div className="App">
    <h1>Who are you?</h1>
      <button className='button' onClick={() => {setManager(true); setInvestor(false)}}>Manager</button>
      <button className='button' onClick={() => {setInvestor(true); setManager(false)}}>Investor</button>
      <div>
        {investor && <Investors state={state} account={account} />}
        {manager && <Manager state={state} account={account} />}    
      </div>
    </div>
  );
}


export default Home
