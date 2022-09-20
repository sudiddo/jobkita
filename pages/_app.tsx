import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider, DehydratedState } from "react-query";
import { queryClient } from "src/api";
import Layout from "components/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import PageLoading from "components/PageLoading";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="NO. 1 JOB PORTAL" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="manifest" href="/site.webmanifest.json" />

        <title>JobKita | No. 1 Job Portal</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            {loading ? <PageLoading /> : <Component {...pageProps} />}
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
