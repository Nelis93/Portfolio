// import Head from "next/head";
// import Image from "next/image";
import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });
function jokes(): Promise<string> {
  return fetch("https://api.chucknorris.io/jokes/random")
    .then((data) => data.json())
    .then((data) => data.toString());
}
console.log(jokes());
export default function Home() {
  return (
    <>
      <div>Test</div>
    </>
  );
}
