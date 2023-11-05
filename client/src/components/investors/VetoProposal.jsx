import React from 'react';

const VetoProposal = ({state, account}) => {
        async function vetoProposal(event){
            try{
                event.preventDefault();
                const {contract} = state;
                const proposalID = document.querySelector("#id").value;
                await contract.methods.Veto(proposalID).send({from:account, gas:480000});
            }catch(error){
                alert(error);
            }
    
     }
        return<><form onSubmit={vetoProposal} >
        <label className="label1" htmlFor="proposalId">
        <span className="font">Proposal Id:</span>
            </label>
        <input type="text" id="id"></input>
        <button className="button" type="submit">Give Veto</button>
        </form><br></br></>
        
}

export default VetoProposal
