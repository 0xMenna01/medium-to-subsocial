import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: "10px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
    padding: "10px",
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  components: { Modal: modalTheme },
  colors: {
    main: "#CFCFCF",
    hover: "#AEAEAE",
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
