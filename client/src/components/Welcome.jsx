import React, { useEffect, useState } from 'react';
import "../App.css";
import Home from '../Home';
import DAO from "../contracts/DAO.json";
import InvestorList from './InvestorList';
import ProposalList from './ProposalList';
import getWeb3 from "./getWeb3";
 

const Welcome = () => {
    const [state, setState] = useState({
        web3: null,
        contract: null,
      });
      const [account, setAccount] = useState("Not connected");
      const [balance,setBalance]= useState(0)
      const [accountSelected, SetAccountSelected] = useState(false);

      useEffect(() => {
        async function init() {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = DAO.networks[networkId];
        const contract = new web3.eth.Contract(
           DAO.abi,
            deployedNetwork.address
          );
          setState({ web3: web3, contract: contract });
        }
        init();
      }, []);
    
    
      useEffect(() => {
        const { web3 } = state;
        const allAccounts = async () => {
          var select = document.getElementById("selectNumber");
          var options = await web3.eth.getAccounts();
    
          for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
          }
        };
        web3 && allAccounts();
      }, [state]);
    
      
      const selectAccount = async () => {
        let selectedAccountAddress = document.getElementById("selectNumber").value;
        if (
          selectedAccountAddress &&
          selectedAccountAddress !== "Choose an account"
        ) {
          setAccount(selectedAccountAddress);
        }
        console.log(state);
      }
      console.log(account);

  //account balance fetching
      useEffect(()=>{
        const {web3} = state;
        async function getBalance(){
          if(account !== "Not connected"){
            const balanceWei = await web3.eth.getBalance(account);
            const balanceEth = web3.utils.fromWei(balanceWei);
            setBalance(balanceEth);
          }
        }
        // console.log(balance);
        web3 && getBalance();
      },[state, account])

  return (
    <div className="App">
    <h1>Welcome to Our Decentralize Autonoumous Organization</h1>
    <p className="font">Connected Account: {account}</p>
    <p className="font">Available Funds: {balance} ETH</p>
    <form className="label0" id="myForm">
        <label htmlFor=""></label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option align="center">Choose an account</option>
        </select>
    </form>
    <button className='button' onClick={() => {SetAccountSelected(true)}}>Choose Your Role</button>
    <div>
        {account!=="Not connected" && accountSelected && <Home state={state} account={account} />}  
    </div>
    <div>
    <InvestorList state={state}></InvestorList>
    <ProposalList state={state}></ProposalList>
    </div>
    {/* <Navigate to="/home" state={state} account={account}/> */}
    <br/><br/>
    </div>
  )
}

export default Welcome

