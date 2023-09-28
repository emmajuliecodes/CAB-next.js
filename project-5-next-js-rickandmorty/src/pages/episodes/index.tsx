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
	s1,
	s2,
	s3,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	// console.log("episodes array", data[0].name);

	return (
		<>
			<div>
				<main className={`${styles.main} ${inter.className}`}>
					<h1>Episodes</h1>
					<h2>Season 1</h2>

					{s1 &&
						s1.map((s) => {
							return (
								<>
									<div>
										<Link
											style={{ border: "solid 1px black", padding: "0.5em" }}
											key={s.id}
											href={`/episodes/${s.id}`}>
											{s.name}
										</Link>
									</div>
									<br></br>
								</>
							);
						})}

					<h2>Season 2</h2>

					{s2 &&
						s2.map((s) => {
							return (
								<>
									<div>
										<Link
											style={{ border: "solid 1px black", padding: "0.5em" }}
											key={s.id}
											href={`/episodes/${s.id}`}>
											{s.name}
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

export async function getServerSideProps() {
	const [s1Res, s2Res, s3Res] = await Promise.all([
		fetch("https://rickandmortyapi.com/api/episode/1,2,3,4,5,6,7,8,9,10,11"),
		fetch(
			"https://rickandmortyapi.com/api/episode/12,13,14,15,16,17,18,19,20,21"
		),
		fetch("https://rickandmortyapi.com/api/episode/14,15"),
	]);
	const [s1, s2, s3] = await Promise.all([
		s1Res.json(),
		s2Res.json(),
		s3Res.json(),
	]);
	console.log(s1);
	return { props: { s1, s2, s3 } };
}

export default Episodes;

// Look at getting data client side first
