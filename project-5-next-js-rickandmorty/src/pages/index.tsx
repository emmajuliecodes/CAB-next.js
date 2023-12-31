import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Homepage</title>
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				<h1>Homepage</h1>
				<div className={styles.characterGrid}></div>
			</main>
		</>
	);
}
