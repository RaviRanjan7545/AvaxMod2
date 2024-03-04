import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import AmazonTVSubscriptionAbi from "../artifacts/contracts/Assessment.sol/AmazonTVSubscription.json";

export default function HomePage() {
  const [userWallet, setUserWallet] = useState(undefined);
  const [userAccount, setUserAccount] = useState(undefined);
  const [amazonTVContract, setAmazonTVContract] = useState(undefined);

  const changePassPrev = useRef();
  const changePassNew = useRef();

  const grantAccessAddr = useRef();
  const revokeAccessAddr = useRef();

  const loginAddr = useRef();
  const loginPass = useRef();

  const contractAddress = "0xD9020c84eF2209323204484ab58106773e686303"; // Update this with your AmazonTVSubscription contract address
  const contractABI = AmazonTVSubscriptionAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setUserWallet(window.ethereum);
    }

    if (userWallet) {
      try {
        const accounts = await userWallet.request({ method: "eth_accounts" });
        handleAccounts(accounts);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleAccounts = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setUserAccount(accounts[0]);
    } else {
      console.log("No user account found");
    }
  };

  const connectToMetamask = async () => {
    if (!userWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await userWallet.request({ method: "eth_requestAccounts" });
    handleAccounts(accounts);

    // Once wallet is set, get a reference to the deployed contract
    getAmazonTVContract();
  };

  const getAmazonTVContract = () => {
    const provider = new ethers.providers.Web3Provider(userWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    setAmazonTVContract(contract);
  };

  const changePassword = async () => {
    let prevKey = Number(changePassPrev.current.value);
    let newKey = Number(changePassNew.current.value);
    try {
      if (amazonTVContract) {
        let tx = await amazonTVContract.changePassword(prevKey, newKey);
        await tx.wait();
        console.log(`PASSWORD CHANGED SUCCESSFULLY`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const grantAccess = async () => {
    let addr = grantAccessAddr.current.value;
    try {
      if (amazonTVContract) {
        let tx = await amazonTVContract.grantAccess(addr);
        await tx.wait();
        console.log(`ACCESS GRANTED : ${addr}`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const revokeAccess = async () => {
    let addr = revokeAccessAddr.current.value;
    try {
      if (amazonTVContract) {
        let tx = await amazonTVContract.revokeAccess(addr);
        await tx.wait();
        console.log(`ACCESS REVOKED : ${addr}`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const login = async () => {
    let addr = loginAddr.current.value;
    let pass = Number(loginPass.current.value);
    try {
      if (amazonTVContract) {
        let tx = await amazonTVContract.loginAccount(addr, pass);
        await tx.wait();
        console.log(`LOGGED IN`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Amazon TV Subscription</h1>
      </header>
      <div className="content">
        {!userAccount ? (
          <button onClick={connectToMetamask}>Start Amazon TV Subscription</button>
        ) : (
          <>
            <div className="div">
              <div className="container">
                <button onClick={changePassword}>CHANGE PASSWORD</button>
                <div>
                  <input ref={changePassPrev} type="password" placeholder="Previous Password"></input>
                  <input ref={changePassNew} type="password" placeholder="New Password"></input>
                </div>
              </div>
              <div className="container">
                <button onClick={grantAccess}>GRANT ACCESS</button>
                <div>
                  <input ref={grantAccessAddr} type="text" placeholder="Address"></input>
                </div>
              </div>
              <div className="container">
                <button onClick={revokeAccess}>REVOKE ACCESS</button>
                <div>
                  <input ref={revokeAccessAddr} type="text" placeholder="Address"></input>
                </div>
              </div>
              <div className="container">
                <button onClick={login}>LOGIN</button>
                <div>
                  <input ref={loginAddr} type="text" placeholder="Address"></input>
                  <input ref={loginPass} type="password" placeholder="Password"></input>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          margin-bottom: 20px;
          width: 50vw;
          margin-inline: auto;
        }

        .content {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
        }

        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 10px;
        }

        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
          width: 20vw;
          display: block;
        }

        .header {
          text-align: center;
          margin-bottom: 20px;
        }

        .header h1 {
          font-size: 24px;
          color: #333;
        }

        .div {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 1em;
        }
      `}</style>
    </main>
  );
}
