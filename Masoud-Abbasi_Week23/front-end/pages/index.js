import Head from "next/head";
import { getCookie } from "../utils/cookie.js";
import { useRouter } from "next/router";
import Panel from "./panel.js";

export default function Home() {
  const router = useRouter();
  const cookie = getCookie();

  if (cookie === "undefined") {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>Masoud-Abbasi_Week23</title>
        <meta
          name="description"
          content="Botostart Bootcamp Project (Week: 23)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/warehouse.png" />
      </Head>
      <Panel />
    </>
  );
}
