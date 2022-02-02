import React, {useState, useEffect, createContext, useCallback} from 'react'
import { ethers } from 'ethers'
import { contractAbi, contractAddress } from '../utils/const'



const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);
    console.log(
        signer,
        provider,
        transactionContract
        )
    }

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
    const checkIfConnected = async () => {
        if(!ethereum)  return alert('Please connect to MetaMask')

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

        console.log(accounts)
    }
    
    useEffect(() => {
        checkIfConnected()
    }, [])
    return( 
    <TransactionContext.Provider value={{value:'test'}}>
        {
            children
        }
    </TransactionContext.Provider>
    )
}