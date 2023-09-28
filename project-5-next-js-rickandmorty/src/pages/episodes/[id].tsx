import { Episode, ApiData } from "@/@types";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";

interface Props {
	episode: Episode;
}

const Episode = ({
	episode,
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
				<h1>{episode.name}</h1>
				{/* <Image
					src={episode.image}
					width={200}
					height={200}
					alt="character image"
				/> */}
				<p></p>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps<{ episode: Episode }> = async (
	context
) => {
	console.log("Params from GetStaticProps: ", context.params);
	const id = context.params!.id as string;
	console.log("character id :>> ", id);
	const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
	const data = (await response.json()) as Episode[];
	console.log(data, "data");
	return {
		props: {
			episode: data,
		},
	};
};

// Need this for static dynamic fetch- path parameter for each ID. Fetch all, then build path by ID
export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch("https://rickandmortyapi.com/api/episode");
	const result = await response.json();
	const data = result.results as Episode[];

	const paths = data.map((e) => {
		return { params: { id: e.id.toString() } };
	});
	console.log("episode paths", paths);
	return {
		paths: paths,
		fallback: false,
	};
};

export default Episode;
