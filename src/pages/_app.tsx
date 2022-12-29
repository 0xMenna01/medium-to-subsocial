import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { ApiProvider, PostsProvider, TransactionProvider } from "../contexts";
import { AccountProvider } from "../contexts/AccountContext";
import theme from "../stylesheets/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApiProvider>
        <AccountProvider>
          <TransactionProvider>
            <PostsProvider>
              <Component {...pageProps} />
            </PostsProvider>
          </TransactionProvider>
        </AccountProvider>
      </ApiProvider>
    </ChakraProvider>
  );
}
