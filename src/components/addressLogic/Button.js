import { connector } from "../../config/web3";
import { useCallback, useEffect, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import useTruncatedAddress from '../../hooks/useWalletData';

export default function Button(props){
    const { active, activate, deactivate, account, error, library } = useWeb3React();
    const isUnsupportedChain = error instanceof UnsupportedChainIdError;
    const [balance, setBalance] = useState(0);

    
    const connect = useCallback(() => {
        activate(connector);
        localStorage.setItem("previouslyConnected", "true");
    }, [activate]);
    
    const getBalance = useCallback(async () => {
        const toSet = await library.eth.getBalance(account);
        setBalance((toSet / 1e18).toFixed(2));
      }, [library?.eth, account]);
    
    
    const disconnect = useCallback(
        () => {
            deactivate();
            localStorage.removeItem("previouslyConnected");
        },[deactivate])
        
        useEffect(() => {
            if(active) getBalance();
        } , [active, getBalance]);


        useEffect(() => {
            if(localStorage.getItem("previouslyConnected") !== "true") connect();
        }, [connect]);

    const address = useTruncatedAddress(account);

    return (
        <>
                {
                    active ? 
                    (
                        <button type='button' onClick={disconnect}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            {address !== undefined ? (
                                <div>
                                    <h1> 
                                        {address} &nbsp;
                                    <span className="bg-gray-600"> ~ {balance}??</span>    
                                    
                                    </h1>
                                </div>
                                ) : "???? Undefined Address"                                
                            }
                        </button>
                    ) :(
                        <button type='button' onClick={connect}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={isUnsupportedChain}>
                                {isUnsupportedChain ? "Unsupported Chain" : "Connect your Wallet"}
                        </button>                    
                        )                        
                }
        </>
    )
}
                   