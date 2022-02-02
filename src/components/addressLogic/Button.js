import { connector } from "../../config/web3";
import { useCallback, useEffect, useState } from "react";
import { useWeb3React,UnsupportedChainIdError } from "@web3-react/core";
import useTruncatedAddress from '../../hooks/useWalletData';

export default function Button(props){
    const { active, activate, deactivate, account, error, library } = useWeb3React();
    
    const [balance, setBalance] = useState(props.balance);

    const connect = useCallback(() => {
        activate(connector);
        localStorage.setItem("previouslyConnected", "true");
    }, [activate]);
    
    const disconnect = useCallback(
        () => {
            deactivate();
            localStorage.removeItem("previouslyConnected");
        },[deactivate])
        


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
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            {address !== undefined ? `${address}` : "🤔 Undefined Address"                                
                            }
                        </button>
                    ) :(
                        <button type='button' onClick={connect}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Connect                        
                        </button>                    
                        )                        
                }
        </>
    )
}
                   