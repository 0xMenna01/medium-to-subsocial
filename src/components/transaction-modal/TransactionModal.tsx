import {
  Text,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Progress,
  ModalCloseButton,
} from "@chakra-ui/react";
import ErrorIcon from "../../../public/error.png";
import SuccessIcon from "../../../public/success.png";
import { ReactNode, useEffect, useState } from "react";

import { TRANSACTION } from "../../model/transaction";
import Image from "next/image";
import { useTransaction } from "../../contexts";

type TransactionProps = {
  children: ReactNode;
};

export const TransactionModal = ({ children }: TransactionProps) => {
  const [progressValue, setProgressValue] = useState<number | undefined>(
    undefined
  );
  const [statusMessage, setMessage] = useState("");

  const { isSent, send, transactionStatus, setStatus } = useTransaction();

  useEffect(() => {
    switch (transactionStatus) {
      case TRANSACTION.INIT: {
        setMessage("Signing the transaction...");
        break;
      }
      case TRANSACTION.SENDING: {
        setMessage("Sending the transaction...");
        break;
      }

      case TRANSACTION.FINALIZED: {
        setProgressValue(100);
        setMessage("Success");
        break;
      }
      case TRANSACTION.CANCELLED: {
        setMessage("Transaction cancelled");
        setProgressValue(0);
        break;
      }
      case TRANSACTION.ERROR: {
        setMessage("Transaction Error: please try again");
        setProgressValue(0);
        break;
      }
    }
  }, [transactionStatus]);

  return (
    <>
      {children}

      <Modal
        closeOnOverlayClick={false}
        isOpen={isSent}
        onClose={() => {
          send(false);
          setStatus(TRANSACTION.INIT);
          setProgressValue(undefined);
        }}
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent padding="25px" position="fixed" right="10px">
          {transactionStatus == TRANSACTION.FINALIZED ||
          transactionStatus == TRANSACTION.ERROR ||
          transactionStatus == TRANSACTION.CANCELLED ? (
            <>
              {transactionStatus == TRANSACTION.FINALIZED ? (
                <Image
                  src={SuccessIcon}
                  alt="Success Icon"
                  width={25}
                  height={25}
                />
              ) : (
                <Image
                  src={ErrorIcon}
                  alt="Error Icon"
                  width={25}
                  height={25}
                />
              )}
              <ModalCloseButton opacity="0.5" />
            </>
          ) : (
            <></>
          )}

          <Progress
            marginTop="20px"
            borderRadius="15px"
            background="main"
            value={progressValue}
            isIndeterminate={progressValue == undefined}
            size="xs"
            colorScheme="purple"
          />
          <Flex marginTop="15px" gap="space-between">
            <Text opacity="0.6" fontSize="15" fontWeight="600">
              {statusMessage}
            </Text>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
