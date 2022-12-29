import { SubmittableExtrinsic } from "@polkadot/api-base/types/submittable";
import { ISubmittableResult } from "@polkadot/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import { TRANSACTION } from "../model/transaction";

import { useAccount } from "./";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  tx?: SubmittableExtrinsic<"promise", ISubmittableResult>;
  setTx: any;
  isSent: boolean;
  send: (isSent: boolean) => void;
  transactionStatus: TRANSACTION;
  setStatus: (status: TRANSACTION) => void;
};

export const TransactionContext = createContext<ContextType>({
  setTx: () => {},
  isSent: false,
  send: () => {},
  transactionStatus: TRANSACTION.INIT,
  setStatus: () => {},
});

export const TransactionProvider = ({ children }: Props) => {
  const [isSent, send] = useState(false);
  const [transactionStatus, setStatus] = useState(TRANSACTION.INIT);
  const [tx, setTx] =
    useState<SubmittableExtrinsic<"promise", ISubmittableResult>>();

  const { account } = useAccount();

  const signAndSend = async () => {
    if (!account.wallet?.extension) {
      throw new Error(
        'The "Wallet.enable(dappname)" function should be called first.'
      );
    }

    const { signer } = account.wallet.extension;

    try {
      await tx?.signAsync(account.address, { signer });
    } catch (err) {
      setStatus(TRANSACTION.CANCELLED);
      return;
    }

    await tx?.send((result: any) => {
      setStatus(TRANSACTION.SENDING);
      const { status } = result;

      if (status.isFinalized || status.isInBlock) {
        const blockHash = status.isFinalized
          ? status.asFinalized
          : status.asInBlock;
        setStatus(TRANSACTION.FINALIZED);
        console.log("✅ Tx finalized. Block hash", blockHash.toString());
      } else if (result.isError) {
        setStatus(TRANSACTION.ERROR);
        console.log(JSON.stringify(result));
      } else {
        console.log("⏱ Current tx status:", status.type);
      }
    });
  };

  useEffect(() => {
    if (account.wallet?.extension) {
      signAndSend();
    }
  }, [tx]);

  return (
    <TransactionContext.Provider
      value={{ tx, setTx, isSent, send, transactionStatus, setStatus }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransaction() {
  return useContext(TransactionContext);
}
