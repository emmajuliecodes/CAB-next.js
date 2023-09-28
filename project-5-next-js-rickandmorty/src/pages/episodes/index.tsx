import { EpisodeData, Episode } from "@/@types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

type Data = {
	data?: Episode[];
	error?: string;
};

function Episodes({
	data,
	error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	// console.log("episodes array", data[0].name);

	return (
		<>
			<div>
				<main className={`${styles.main} ${inter.className}`}>
					<h1>Episodes</h1>

					{data &&
						data.map((e) => {
							return (
								<>
									<div>
										{/* <p>{e.name}</p> */}

										<Link
											style={{ border: "solid 1px black", padding: "0.5em" }}
											key={e.id}
											href={`/episodes/${e.id}`}>
											{e.name}
										</Link>
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
		const response = await fetch(
			"https://rickandmortyapi.com/api/episode/1,2,3"
		);
		const result = (await response.json()) as Episode[];
		console.log(result, "result");
		return { props: { data: result } };
	} catch (e) {
		return { props: { error: "Oops, something went wrong!" } };
	}
};

export default Episodes;

// Look at getting data client side first
