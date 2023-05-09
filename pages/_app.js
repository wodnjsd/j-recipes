import "@/styles/globals.css";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";
import { Jacques_Francois, Castoro_Titling } from "next/font/google";

const jacques = Jacques_Francois({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jacques",
});

const castoro = Castoro_Titling({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-castoro",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>

        <main className={`${jacques.variable} ${castoro.variable}`}>
        <Layout>
          <Component {...pageProps} />
          </Layout>
        </main>

    </SessionProvider>
  );
}
