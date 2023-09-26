// SERVER SIDE FETCH IN HERE - CHECK EMILY WORK

import { Character } from "@/@types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";

interface Data {
	characters?: Character[];
	error?: string;
}

function Characters({
	characters,
	error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	console.log(characters);
	return (
		<>
			<div>
				<h1>Characters</h1>
				<h2>The Rick & Morty universe...</h2>
			</div>
			<div>
				{characters &&
					characters.map((c) => {
						return (
							<Link
								style={{ border: "solid 1px black", padding: "0.5em" }}
								key={c.name}
								href={`/${c.name}`}>
								{c.name}
							</Link>
						);
					})}
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
	try {
		const response = await fetch("https://rickandmortyapi.com/api/character");
		const result = await response.json();
		console.log(result, "result");
		return { props: { characters: result } };
	} catch (e) {
		return { props: { error: "Oops, something went wrong!" } };
	}
};

export default Characters;
