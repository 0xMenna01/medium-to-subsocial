import { supportedWallets } from "../../wallets/supportedWallets";
import { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import { config } from "../../../config";
import { Box, useToast, Image, Text } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { Toast } from "../../../components/toast/Toasts";
import { WalletAccount, Wallet } from "../../../model/wallet";

const { appName } = config;

type GetWalletPorps = {
  setAccounts: (accounts: WalletAccount[]) => void;
  setStep: (step: number) => void;
};

const WalletList = ({ setAccounts, setStep }: GetWalletPorps) => {
  const toast = useToast();
  const [unsubscribe, setUnsubscribe] = useState<() => unknown>();

  useEffect(() => {
    return () => {
      if (unsubscribe) {
        unsubscribe?.();
      }
    };
  });

  const onClick = async (wallet: Wallet) => {
    if (wallet.installed) {
      const ret = await wallet.enable(appName);
      if (ret) {
        toast({
          position: "bottom-left",
          render: () => <Toast title={`${ret}`.replace("Error:", "")} />,
          duration: 4000,
        });
      }
      if (wallet.enabled) {
        const unsub: any = await wallet.subscribeAccounts(async (accounts) => {
          if (accounts) {
            setAccounts(accounts);
            setStep(2);
          }
        });

        setUnsubscribe(unsub);
      }
    } else {
      toast({
        position: "bottom-left",
        render: () => (
          <Toast
            title={`${wallet.title} extension is not installed or refresh the browser if ${wallet.title} is already installed`}
          />
        ),
        duration: 4000,
      });
    }
  };

  const wallets = supportedWallets.map((wallet) => {
    const { title, logo, installed, installUrl } = wallet;

    return (
      <Box
        background="main"
        margin="7px"
        padding="30px"
        key={title}
        className={styles.list}
        _hover={{
          cursor: "pointer",
          bgColor: "hover",
          transform: "scale(1.02)",
        }}
        onClick={() => {
          if (!installed) {
            window.open(installUrl, "_blank");
          } else {
            return onClick(wallet);
          }
        }}
      >
        <Box className={styles.icon}>
          <Image src={logo.src} alt={logo.alt} className={styles.icon} />
        </Box>

        <Text fontWeight="900" fontSize="18px">
          {title}
        </Text>
        {!installed && <DownloadIcon marginLeft="auto" />}
      </Box>
    );
  });

  return <>{wallets}</>;
};

export default WalletList;
