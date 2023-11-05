import React from 'react';

const Cancelation = ({state, account}) => {
        async function cancelProposal(event){
            try{
                event.preventDefault();
                const {contract} = state;
                const proposalID = document.querySelector("#id").value;
                await contract.methods.CancelProposal(proposalID).send({from:account, gas:480000});
            }catch(error){
                alert(error);
            }
    
     }
        return<><form onSubmit={cancelProposal} >
        <label className="label1" htmlFor="proposalId">
        <span className="font">Proposal Id:</span>
            </label>
        <input type="text" id="id"></input>
        <button className="button" type="submit">Cancel Proposal</button>
        </form><br></br></>
        
}

export default Cancelation
