import { Button } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

type ButtonProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
};

export const MainButton = ({ text, onClick, width }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      w={width}
      borderRadius="10px"
      padding="10px"
      bg="main"
      _hover={{ bg: "hover" }}
      _active={{ bg: "hover", opacity: "0.6" }}
      borderColor="main"
    >
      {text}
    </Button>
  );
};
