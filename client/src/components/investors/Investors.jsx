
import Contribute from "./Contribute";
import ReedemShare from "./ReedemShare";
import TransferShare from "./TransferShare";
import VetoProposal from "./VetoProposal";
import VoteProposal from "./VoteProposal";
function Investors({state,account}) {
    return <> 
    <Contribute state={state} account={account}></Contribute>
    <TransferShare state={state} account={account}></TransferShare>
    <ReedemShare state={state} account={account}></ReedemShare>
    <VoteProposal state={state} account={account}></VoteProposal>
    <VetoProposal state={state} account={account}></VetoProposal>
    </>
 

}
export default Investors;