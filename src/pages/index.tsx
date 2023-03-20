import Head from "next/head";
import type { NextPage } from "next";

import styles from "@/styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <title>Nelis Portfolio</title>
        </Head>
        <h1 className="text-red-500">Something here</h1>
      </div>
    </>
  );
};
export default Home;
