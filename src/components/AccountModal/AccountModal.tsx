import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Text,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { WalletAccount } from "../../model/wallet";
import WalletList from "../wallets/wallet-list/WalletsList";
import { Accounts } from "./Accouts";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SignedInModal } from "./signed-in/SignedInModal";
import { MainButton } from "../button/MainButton";

type AccountModalProps = {
  connected: boolean;
  account: WalletAccount;
  setAccount: (account: WalletAccount) => void;
};

export const AccountModal = ({
  setAccount,
  connected,
  account,
}: AccountModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [accounts, setAccounts] = useState<WalletAccount[]>(
    {} as WalletAccount[]
  );

  const getText = () => {
    switch (step) {
      case 2: {
        return ["Select your account", "Choose one of your accounts"];
      }
      case 3: {
        //Energy or Tokens
        return [];
      }

      default: {
        return ["Select your Wallet", "Click on one of the wallet providers"];
      }
    }
  };

  const Step = () => {
    switch (step) {
      case 2: {
        return <Accounts walletAccounts={accounts} setAccount={setAccount} />;
      }
      case 3: {
        return <></>;
      }

      default: {
        return <WalletList setAccounts={setAccounts} setStep={setStep} />;
      }
    }
  };

  if (connected) {
    return (
      <SignedInModal
        account={account}
        accounts={accounts}
        close={onClose}
        setAccount={setAccount}
        setStep={setStep}
      />
    );
  } else {
    return (
      <>
        <MainButton onClick={onOpen} text="Connect" />

        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent padding="12px">
            {step > 1 ? (
              <Flex gap="10px" opacity="0.5">
                <ArrowBackIcon
                  w={8}
                  h={8}
                  onClick={() => setStep(1)}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>
            ) : (
              <></>
            )}
            <ModalHeader>
              {step != 4 ? (
                <>
                  <Text className={styles.modaltitle}>{getText()[0]}</Text>
                  <Text fontSize="16" fontWeight="800" opacity="0.6">
                    {getText()[1]}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </ModalHeader>

            <ModalBody>
              <Step />
            </ModalBody>
            <ModalCloseButton h={10} w={10} opacity="0.6" />
          </ModalContent>
        </Modal>
      </>
    );
  }
};
