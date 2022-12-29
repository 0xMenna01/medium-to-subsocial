import React, { createContext, useContext, useEffect, useState } from "react";
import { WalletAccount } from "../model/wallet";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  isConnected: boolean;
  account: WalletAccount;
  setAccount: (account: WalletAccount) => void;
};

export const AccountContext = createContext<ContextType>({
  isConnected: false,
  account: {} as WalletAccount,
  setAccount: {} as React.Dispatch<React.SetStateAction<WalletAccount>>,
});

export const AccountProvider = ({ children }: Props) => {
  const [account, setAccount] = useState<WalletAccount>({} as WalletAccount);
  const isConnected = account != undefined && JSON.stringify(account) != "{}";

  return (
    <AccountContext.Provider value={{ isConnected, account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export function useAccount() {
  return useContext(AccountContext);
}
