import { InfoIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";

type ToastProps = {
  title: string;
};

export const Toast = ({ title }: ToastProps) => {
  return (
    <Flex
      margin={"20px"}
      width={"auto"}
      height={"auto"}
      p={5}
      background="main"
      alignItems="center"
      borderRadius="10px"
      gap="25px"
    >
      <InfoIcon color="black" />
      <Text fontWeight="600">{title}</Text>
    </Flex>
  );
};
