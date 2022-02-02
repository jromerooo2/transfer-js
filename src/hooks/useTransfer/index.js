import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import TransactionArtifact from "../../config/web3/artifacts/Transaction";

const { address, abi } = TransactionArtifact;

const useTransfer = () => {

    const { active, library, chainId } = useWeb3React();

    const transfer = useMemo(
        () => {
        if (active) return library?.eth?.contract(abi, address[chainId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, chainId, library?.eth.contract]);

    return transfer;
}


export default useTransfer;