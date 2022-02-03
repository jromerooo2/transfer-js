import { useWeb3React,UnsupportedChainIdError } from "@web3-react/core";
import { useState, useCallback } from "react";
import useTransfer from "../hooks/useTransfer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Form(){
    const { active, account, error, library } = useWeb3React();
    const [accountTo, setAccountTo] = useState("");
    const [amount, setAmount] = useState(0);
    
    const transfer = useTransfer();
    const isUnsupportedChain = error instanceof UnsupportedChainIdError;
    
    const handleAddressChange = (e) =>{
        setAccountTo(e.target.value);
    }
    const handleAmmountChange = (e) =>{
        setAmount(e.target.value);
    }
    
    const sendEth = () => { 
        const isAddress = library.utils.isAddress(accountTo);
        
        if(transfer && isAddress){              

                library.eth.sendTransaction({
                    from: account,
                    to: accountTo,
                    value: library.utils.toWei(amount, 'ether')                    
                })                
                    .on("transactionHash", (hash)=>{
                            toast.info('🦄 TXN #  ' + hash,  {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                theme: "dark",
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: false,
                                progress: undefined,
                            });
                        })
                        .on("receipt", ()=>{
                            toast.success(`🎉 TXN Confirmed.` , {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                theme: "dark",
                                draggable: false,
                                closeOnClick: true,
                                progress: undefined,
                            })
                        })
                        .on("error", (error)=>{
                            toast.error(error.message , {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                theme: "dark",
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: false,
                                progress: undefined,
                            })
                        })
                

                    
            }else {
                toast.warning('Please verify the information.' ,  {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    theme: "dark",
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
    }

    
    
    return (
        <>
        <form className="md:w-96">
            <ToastContainer />
            <div className="mb-6">
                <label className="block mb-2 font-mono text-sm font-medium dark:text-gray-400">Receiver Address</label>
                <input type="text" id="eth" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light font-mono" placeholder="0X0000...0000" required 
                onChange={handleAddressChange}></input>
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-mono text-sm font-medium dark:text-gray-400">ETH ammount</label>
                <input type="text" id="ammount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light font-mono" required placeholder="1-10000" onChange={handleAmmountChange}></input>
            </div>

            </form>
            {active ? (
                    <button type='button'  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={sendEth}>Send Crypto</button>
                ):(
                    <h1 disabled={isUnsupportedChain}>
                        {isUnsupportedChain ? "Unsupported Chain, please verify you're in Rinkeby" : "Connect your Wallet"}
                    </h1>
                )
            }

        </>
    );
}