import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Character } from "@/@types";
import React from "react";
import Link from "next/link";

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
		<div style={{ marginBottom: "1em" }}>
			<h1>Characters!</h1>
		</div>
		// <div>
		//         {characters && characters.map ((c) => {
		//             return Link style={{ border: "solid 1px black", padding: "0.5em" }} key={c.name.common} href={`/countries/${c.cca2.toLowerCase()}`}>{c.name.common}</Link
		//         }) }
		// </div>
	);
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
	try {
		const response = await fetch("https://rickandmortyapi.com/api/character");
		const result = await response.json();
		return { props: { countries: result } };
	} catch (e) {
		return { props: { error: "something went wrong" } };
	}
};

export default Characters;
