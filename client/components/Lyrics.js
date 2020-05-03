import React from "react";

const Lyrics = props => {
	return (
		<div>
			<h2>Title: {props.title}</h2>
			<h3>Artist: {props.artist}</h3>
			<h4>Lyrics:</h4>
			<p>{props.lyrics}</p>
		</div>
	);
};

export default Lyrics;
