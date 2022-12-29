import { Flex, Text } from "@chakra-ui/react";
import { MouseEventHandler, ReactNode } from "react";

type AddLinkProps = {
  className?: string;
  text?: string;
  children: ReactNode;
  bg: string;
  isHover?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const IconCustomButton = ({
  text,
  children,
  bg,
  isDisabled,
  onClick,
}: AddLinkProps) => {
  return (
    <Flex
      flexDir="column"
      gap="7px"
      alignItems="center"
      borderRadius="10px"
      background={bg}
      _hover={{
        background: "hover",
        cursor: "pointer",
        transform: "scale(1.03)",
      }}
      _active={{ background: "hover", opacity: "0.8" }}
      padding="10px"
      onClick={onClick}
    >
      {children}
      <Text
        paddingLeft="30px"
        paddingRight="30px"
        fontSize="13px"
        opacity="0.8"
        fontWeight="600"
      >
        {text}
      </Text>
    </Flex>
  );
};
