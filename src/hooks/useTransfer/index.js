import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import TransactionArtifact from "../../config/web3/artifacts/Transaction";

const { address, abi } = TransactionArtifact;

const useTransfer = () => {
    const { active, library } = useWeb3React();
    const transfer = useMemo(() => {
        if (active) return new library.eth.Contract(abi, address);
    }, [active,library?.eth?.Contract]);

    return transfer;
}


export default useTransfer;