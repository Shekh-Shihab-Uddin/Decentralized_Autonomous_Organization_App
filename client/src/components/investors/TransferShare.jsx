import "./investors.css";
function TransferShare({state,account}){
    async function shareTransfer(event){

        try{
            event.preventDefault();//page will not reload if form get submitted
            const {contract} = state;
            // console.log(contract);
            const amount = document.querySelector("#amount").value;
            const to = document.querySelector("#to").value;
            await contract.methods.transferShare(amount,to).send({from:account, gas:480000});
        }catch(error){
            alert(error);
        }
        window.location.reload()

 }
    return<><form onSubmit={shareTransfer}>
    <label className="label1" htmlFor="amount">
    <span className="font">Amount:</span>
        </label>
    <input type="text" id="amount"></input>
    <label className="label1" htmlFor="to">
    <span className="font">Address:</span>
        </label>
    <input type="text" id="to"></input>
    
    <button className="button" type="submit">Transfer Share</button>
    </form><br></br></>
   }
   export default TransferShare;