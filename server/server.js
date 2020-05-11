const db = require("../db/db");
const { getTrackId, getTrack } = require("../helper/helper");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get('/test', (req, res) => {
    res.send('hit test route');
})

app.post('/lyrics', (req, res) => {
	let data = {
		id: "",
		title: "",
		artist: "",
		lyrics: ""
	};

	getTrackId(req.body.title, req.body.artist, (error, result) => {
		data.title = req.body.title;
		data.artist = req.body.artist;

		if (error) {
			console.log("error in server musixMatch", error);
		} else {
			// result here is track id
			data.id = result;
			console.log(`data.id, ${data.id}`);
			getTrack(result, (error, response) => {
				if (error) {
					console.log("error in server with musixMatchTrack", error);
				} else {
                    data.lyrics = response;
					return db
						.addSong(data.id, data.title, data.artist, data.lyrics)
						.then(() => {
							return db.getLyrics(data.id);
						})
						.then(result => {
							res.send(result);
						})
						.catch(error => {
							console.log(error);
						});
				}
			});
		}
	});
});

const port = 6000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
