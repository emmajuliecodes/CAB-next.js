import { Character, ApiData } from "@/@types";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";

interface Data {
	data?: ApiData;
	error?: string;
}

const Character = ({
	character,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div
			style={{
				display: "flex",
				minHeight: "60vh",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<div>
				<h1>{character.name}</h1>
				<Image
					src={character.image}
					width={200}
					height={200}
					alt="character image"
				/>
				<p></p>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps<{ character: Character }> = async (
	context
) => {
	console.log("Params from GetStaticProps: ", context.params);
	const id = context.params!.id as string;
	const response = await fetch(
		`https://rickandmortyapi.com/api/character/result/${id}`
	);
	const data = (await response.json()) as Character[];
	console.log(data, "data");
	return {
		props: {
			character: data[0],
		},
	};
};

// Need this for static dynamic fetch- path parameter for each ID. Fetch all, then build path by ID
export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch("https://rickandmortyapi.com/api/character/");
	const result = (await response.json()) as Character[];
	const paths = result.map((character) => {
		return { params: { id: character.id.toString() } };
	});
	console.log(paths);
	return {
		paths: paths,
		fallback: false,
	};
};

export default Character;
