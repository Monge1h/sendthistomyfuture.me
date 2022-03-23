import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import CSSReset from "@chakra-ui/css-reset";

function MyApp(props: any) {
  const { Component, pageProps } = props;
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
