import Link from "next/link";
import React from "react";

type Props = {};

function Nav({}: Props) {
	return (
		<div
			style={{
				width: "100%",
				height: "50px",
				display: "flex",
				gap: "1em",
				alignItems: "center",
				padding: "0 1em",
				border: "solid 1px black",
				font: "inter",
			}}>
			<Link href={"/"}>Homepage</Link>{" "}
			<Link href={"/characters"}>Characters</Link>
			<Link href={"/episodes"}>Episodes</Link>
		</div>
	);
}

export default Nav;
