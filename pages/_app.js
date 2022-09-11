import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby} chainRpc={{[ChainId.Rinkeby]:'https://rinkeby.infura.io/v3/53f41eac397e45b39edf9d08f51feb07'}}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
