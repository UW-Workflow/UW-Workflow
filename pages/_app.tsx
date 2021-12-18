import "../styles/globals.css";
import { AuthUserProvider } from "../utils/AuthUserContext";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}
export default MyApp;
