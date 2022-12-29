import React, { createContext, useContext, useEffect, useState } from "react";
import { SubsocialApi } from "@subsocial/api";
import { ApiPromise } from "@polkadot/api";
import { config as inputConfig } from "../config";
import { IpfsConnect } from "../ipfs/IpfsConnect";

type Props = {
  children: React.ReactNode;
};

export type ApiType = {
  subApi: SubsocialApi;
  ipfs: IpfsConnect;
};

export type ContextType = {
  isApiReady: boolean;
  api: ApiType;
  substrateApi: ApiPromise;
};
export const ApiContext = createContext<ContextType>({
  isApiReady: false,
  api: {} as ApiType,
  substrateApi: {} as ApiPromise,
});

const config = {
  substrateNodeUrl: inputConfig.substrateNodeUrl,
  ipfsNodeUrl: inputConfig.ipfsNodeUrl,
};

const ipfsConfig = {
  ipfs: inputConfig.ipfs,
};

export async function initApi() {
  const subApi = await SubsocialApi.create(config);
  const ipfs = initIpfs();
  return { subApi, ipfs };
}

export function initIpfs() {
  const ipfs = new IpfsConnect(ipfsConfig.ipfs);
  return ipfs;
}

export const ApiProvider = ({ children }: Props) => {
  const [api, setApi] = useState<ApiType>({} as ApiType);
  const [substrateApi, setSubstrateApi] = useState<ApiPromise>(
    {} as ApiPromise
  );
  const [isApiReady, setApiReady] = useState(false);

  useEffect(() => {
    setApiReady(false);
    initApi().then((res) => {
      setApi(res);
      res.subApi.substrateApi.then((res) => {
        setSubstrateApi(res);
        setApiReady(true);
      });
    });
  }, []);

  return (
    <ApiContext.Provider value={{ isApiReady, api, substrateApi }}>
      {children}
    </ApiContext.Provider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}
