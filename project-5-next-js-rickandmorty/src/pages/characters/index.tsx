// SERVER SIDE FETCH IN HERE - CHECK EMILY WORK

import { ApiData, Character } from "@/@types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

interface Data {
	data?: ApiData;
	error?: string;
}

function Characters({
	data,
	error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	console.log(data);
	return (
		<>
			<div>
				<main className={`${styles.main} ${inter.className}`}>
					<h1>Characters</h1>
					<h2>The Rick & Morty universe...</h2>

					{data &&
						data.results.map((c) => {
							return (
								<>
									<div className={styles.grid}>
										<div>
											<Image
												src={c.image}
												width={200}
												height={200}
												alt="character image"
											/>
											<br></br>
											<br></br>
											<Link
												style={{
													border: "solid 1px black",
													padding: "0.5em",
												}}
												key={c.name}
												href={`/characters/${c.id}`}>
												{c.name}
											</Link>
										</div>
									</div>
									<br></br>
								</>
							);
						})}
				</main>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
	try {
		const response = await fetch("https://rickandmortyapi.com/api/character");
		const result = await response.json();
		console.log(result, "result");
		return { props: { data: result } };
	} catch (e) {
		return { props: { error: "Oops, something went wrong!" } };
	}
};

export default Characters;

// Look at getting data client side first
