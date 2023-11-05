import Web3 from "web3";

const getWeb3 = async () =>{
  // Wait for loading completion to avoid race conditions with web3 injection timing.
 await new Promise((resolve)=>{
   window.addEventListener("load", async () => {
    resolve()
  })
})
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Accounts now exposed
        return web3;
      } catch (error) {
        return error;
      }
    }

    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      return web3;
    }
  };

export default getWeb3;