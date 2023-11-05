import { useEffect, useState } from "react";

function ProposalList({state}){
   const [list,setList]=useState([]);
   useEffect(()=>{
      const {contract} = state;
      async function proposals(){
         const arrayProposal = await contract.methods.ProposalList().call();
         // console.log(arrayProposal);
         setList(arrayProposal);
      }

      contract && proposals();
   },[state]);

   return(
   <>
<div className="list">
    <h3>Proposal List</h3>
    <table>
      <tbody>
      {list.map((proposal)=>{
         return (
                 <tr key={proposal.id}>
                 <td>ID:{proposal.id}</td>
                 <td>Description:{proposal.description}</td>
                 <td>Amount:{proposal.amount}</td>
                 <td>Receipent:{proposal.receipient}</td>
                 <td>Votes:{proposal.votes}</td>
                 <td>End Time:{proposal.end}</td>
                 </tr>
      )})}
      </tbody>
      </table>
   </div>
   </>
   )
  }
  export default ProposalList;