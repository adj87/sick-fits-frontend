import Page from "../components/Page";
import { Router } from "next/dist/client/router";
import nProgress from "nprogress";

import "nprogress/nprogress.css";
import "../components/styles/nprogress.css";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
