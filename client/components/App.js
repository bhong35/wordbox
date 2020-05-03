import React from "react";
import axios from "axios";
import Lyrics from "./Lyrics";
import { timingSafeEqual } from "crypto";

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "",
			artist: "",
			displayTitle: "",
			displayArtist: "",
			lyrics: ""
		};
		this.recordResponse = this.recordResponse.bind(this);
		this.searchButton = this.searchButton.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    
    onClick() {
        axios.get('/test')
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

	recordResponse(event) {
		if (event.target.id === "title") {
			this.setState({
				title: event.target.value
			});
		}
		if (event.target.id === "artist") {
			this.setState({
				artist: event.target.value
			});
		}
	}

	searchButton() {
		// possibly async?
		this.searchRequest();
		this.clearInput();
	}

	searchRequest() {
		axios.post("/lyrics", {
				title: this.state.title,
				artist: this.state.artist
			})
			.then(response => {
				this.setState({
					lyrics: response.data[0].lyrics
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	clearInput() {
		let displayTitle = this.state.title;
		let displayArtist = this.state.artist;
		this.setState({
			title: "",
			artist: "",
			displayTitle: displayTitle,
			displayArtist: displayArtist
		});
	}

	render() {
		return (
			<div onClick={this.onClick}>
				<h1>WordBox</h1>
				Artist:
				<input
					type="text"
					id="artist"
					value={this.state.artist}
					onChange={this.recordResponse}
				/>
				<br></br>
				Title:{" "}
				<input
					type="text"
					id="title"
					value={this.state.title}
					onChange={this.recordResponse}
				/>
				<button onClick={this.searchButton}>Search</button>
				<Lyrics
					title={this.state.displayTitle}
					artist={this.state.displayArtist}
					lyrics={this.state.lyrics}
				/>
			</div>
		);
	}
}