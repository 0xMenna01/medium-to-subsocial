import { Box, Fade } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import { Toast } from "../toast/Toasts";

type ConnectionProps = {
  isOpen: boolean;
};

export const Connection = ({ isOpen }: ConnectionProps) => {
  return (
    <>
      <Fade in={isOpen} style={{ zIndex: 10 }}>
        <Box className={styles.connectionbox}>
          <Toast title="Connecting to Subsocial..." />
        </Box>
      </Fade>
    </>
  );
};
