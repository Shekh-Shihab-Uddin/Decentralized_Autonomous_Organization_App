import { useEffect, useState } from "react";
function InvestorList({state}){
   const [list,setList]=useState([]);
   useEffect(()=>{
      const {contract}=state;
      async function investorlist(){
         const investors = await contract.methods.InvestorList().call();
         setList(investors)
     }
     contract && investorlist()
   },[state])
   return<>
    <div className="list">
    <h3>Investor's List</h3>
      {list.map((investorAddress)=>{
          return <p key={investorAddress}>{investorAddress}</p>
      })}
    </div>
   </>
  }
  export default InvestorList;