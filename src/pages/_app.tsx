import "~/styles/index.css";

import NextApp from "next/app";
import Router from "next/router";
import React from "react";
import { SWRConfig } from "swr";

import { Meta } from "~/components/Meta";
import { initAnalytics, logPageView } from "~/lib/analytics";
import { fetcher } from "~/lib/fetcher";

Router.events.on("routeChangeComplete", () => {
  logPageView();
});

class App extends NextApp {
  componentDidMount(): void {
    initAnalytics();
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <SWRConfig value={{ fetcher }}>
        <Meta />
        <Component {...pageProps} />
      </SWRConfig>
    );
  }
}

export default App;
