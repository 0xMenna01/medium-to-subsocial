import styles from "../../styles/Home.module.css";
import AccountIcon from "../../../public/account.png";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { WalletAccount } from "../../model/wallet";

type AccountsProps = {
  walletAccounts: WalletAccount[];
  setAccount: (account: WalletAccount) => void;
};

export const Accounts = ({ walletAccounts, setAccount }: AccountsProps) => {
  const accounts = walletAccounts.map((account) => {
    return (
      <Box
        background="main"
        margin="7px"
        padding="30px"
        key={account.address}
        className={styles.list}
        _hover={{ cursor: "pointer", bgColor: "hover" }}
        onClick={() => setAccount(account)}
      >
        <Box className={styles.icon}>
          <Image
            src={AccountIcon}
            alt={account.name + " Account"}
            className={styles.icon}
          />
        </Box>

        <Text fontWeight="900" fontSize="18px">
          {account.name}
        </Text>
      </Box>
    );
  });

  return <>{accounts}</>;
};
