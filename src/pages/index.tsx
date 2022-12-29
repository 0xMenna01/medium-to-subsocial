import { Box, Button, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { AccountModal } from "../components/AccountModal/AccountModal";
import { Connection } from "../components/connection/Connection";
import { MediumForm } from "../components/form/MediumForm";
import { useApi, useAccount } from "../contexts";
import { TRANSACTION } from "../model/transaction";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { isConnected, account, setAccount } = useAccount();
  const { isApiReady, api, substrateApi } = useApi();
  const [transactionStatus, setStatus] = useState(TRANSACTION.INIT);

  return (
    <div className={styles.page}>
      <Connection isOpen={!isApiReady} />
      <Box className={styles.connectBtn}>
        <AccountModal
          setAccount={setAccount}
          connected={isConnected}
          account={account}
        />
      </Box>
      <MediumForm />
    </div>
  );
}
