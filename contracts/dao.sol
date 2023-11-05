
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract DAO{
    struct Proposal{
        uint id;
        string description;
        uint amount; 
        address payable recipient;
        uint votes;
        uint end;
        bool isExecuted;
        bool veto;//more than 33% percentage of token holders can veto a proposal, even if it meets the quorum requirements.
        bool canceled;//for cancelation before reach the voting deadline, especially if they are no longer relevant or necessary.
    }

    mapping(address=>bool) private isInvestor;
    mapping(address=>uint) public numOfShares;
    mapping(address=>mapping(uint=>bool)) public isVoted;
    //mapping(address=>mapping(address=>bool)) public withdrawlStatus;
    address[] public investorsList;
    mapping(uint=>Proposal) public proposals;

    uint public totalShares;
    uint public availableFunds;
    uint public contributionTimeEnd;
    uint public nextProposalId;
    uint public voteTime;
//quorum= minimum number of votes required to pass a proposal
    uint public quorum;
    address public manager;

//vote time need to give in secods during deploy. e.g. 1hr=36000
    constructor(uint _contributionTimeEnd, uint _voteTime, uint _quorum){
        require(_quorum>0 && _quorum<=100,"Not valid values");
        contributionTimeEnd = block.timestamp+_contributionTimeEnd;
        voteTime = _voteTime;
        quorum = _quorum;
        manager = msg.sender;
    }

    modifier onlyInvestor(){
        require(isInvestor[msg.sender]==true,"You are not an investor");
        _;
    }

    modifier onlyManager(){
        require(manager==msg.sender,"You are not manager");
        _;
    }

    function contribution() external payable{
        require(contributionTimeEnd>=block.timestamp,"Contribution time expired");
        require(msg.value>0,"Can not send zero ether");
        isInvestor[msg.sender]=true;
        numOfShares[msg.sender]+= msg.value;
        totalShares+=msg.value;
        investorsList.push(msg.sender);
        availableFunds+=msg.value;
    }

    function reedemShare(uint _amount) public onlyInvestor(){
        require(numOfShares[msg.sender]>=_amount,"You don't have tihs much share");
        require(availableFunds>=_amount,"Insufficient Funds");

        numOfShares[msg.sender]-=_amount;
        if(numOfShares[msg.sender]==0){
            isInvestor[msg.sender]=false;
        }
        availableFunds-=_amount;
        payable(msg.sender).transfer(_amount);
    }

    function transferShare(uint _amount, address _to) public onlyInvestor(){
        require(numOfShares[msg.sender]>=_amount,"You don't have tihs much share");
        require(availableFunds>=_amount,"Insufficient Funds");

        numOfShares[msg.sender]-=_amount;
        if(numOfShares[msg.sender]==0){
            isInvestor[msg.sender]= false;
        }
        numOfShares[_to]+=_amount;
        isInvestor[_to] = true;
        investorsList.push(_to);
    }

    function createProposal(string calldata _description, uint _amount, address payable _recepient) public {
        require(availableFunds>=_amount,"Not enough funds");

        proposals[nextProposalId] = Proposal(nextProposalId,
            _description,
            _amount,
            _recepient, 
            0, 
            block.timestamp+voteTime, 
            false, 
            false, 
            false
        );

        nextProposalId++;
    }

    function voteProposal(uint _proposalId) public onlyInvestor(){
        Proposal storage proposal = proposals[_proposalId];//pointing to the proposal wit the id that is provided in the arguments
        require(isVoted[msg.sender][_proposalId]==false,"You have already voted for this proposal");
        //now checking the conditions with the help of the pointer
        require(proposal.end>=block.timestamp,"Voting Time Ended");
        require(proposal.isExecuted==false,"It is already Executed");
        require(proposal.canceled == false,"The proposal has been canceled");

        isVoted[msg.sender][_proposalId]= true;
        proposal.votes+=numOfShares[msg.sender];
    }

    function executeProposal(uint _proposalId) public onlyManager(){
        Proposal storage proposal = proposals[_proposalId];
        require(((proposal.votes*100)/totalShares)>=quorum,"Majority does not support");
        require(proposal.veto==false,"Veto has been given to this proposal");
        require(proposal.canceled == false,"The proposal has been canceled");
        proposal.isExecuted==true;
        availableFunds -=proposal.amount;
        _transfer(proposal.amount,proposal.recipient);
    }

    function _transfer(uint _amount, address payable _recepient) private{
        _recepient.transfer(_amount);
    }

    function ProposalList() public view returns(Proposal[] memory){
        Proposal[] memory arr = new Proposal[](nextProposalId);
        for(uint i=0; i<nextProposalId; i++){
            arr[i]=proposals[i];
        }
        return arr;
    }

    function InvestorList() public view returns(address[] memory){
        return investorsList;
    }

    function Veto(uint _proposalId) external onlyInvestor(){
        require((numOfShares[msg.sender]*100/totalShares)>33,"You do not have to power to give veto");
        Proposal storage proposal= proposals[_proposalId];
        proposal.veto = true;
    }

    function CancelProposal(uint _proposalId) external onlyManager(){
        Proposal storage proposal= proposals[_proposalId];
        require((proposal.end>block.timestamp),"Cancalation time has expired");
        proposal.canceled = true;
    }

}

//  > contract address:    0x5545AF86FED6913633B0E694aff0D471de699298
//  > account:             0xeCbc9da4d09A4a5059e6f119444e0CF04288F9ad