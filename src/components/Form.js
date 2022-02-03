import { useWeb3React,UnsupportedChainIdError } from "@web3-react/core";
import { useState, useCallback } from "react";
import useTransfer from "../hooks/useTransfer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Form(){
    const { active, account, error, library } = useWeb3React();
    const [accountTo, setAccountTo] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    
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
                setLoading(true);
                library.eth.sendTransaction({
                    from: account,
                    to: accountTo,
                    value: library.utils.toWei(amount, 'ether')                    
                })                
                    .on("transactionHash", (hash)=>{
                        setLoading(false);
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
                            setLoading(false);
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
                !loading ? (
                    <button type='button'  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={sendEth}>Send Crypto</button>): (
                    <svg role="status" class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    )
                ):(
                    <h1 disabled={isUnsupportedChain}>
                        {isUnsupportedChain ? "Unsupported Chain, please verify you're in Rinkeby" : "Connect your Wallet"}
                    </h1>
                )
            }

        </>
    );
}