const db = require("../db/db");
const helper = require("../helper/musixMatch");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.get('/test', (req, res) => {
    res.send('hit test route');
})

app.post("/lyrics", (req, res) => {
	let data = {
		id: "",
		title: "",
		artist: "",
		lyrics: ""
	};

	helper.musixMatch(req.body.title, req.body.artist, (error, result) => {
		data.title = req.body.title;
		data.artist = req.body.artist;

		if (error) {
			console.log("error in server musixMatch", error);
		} else {
			// result here is track id
			data.id = result;
			helper.musixMatchTrack(result, (error, result) => {
				if (error) {
					console.log("error in server with musixMatchTrack", error);
				} else {
                    data.lyrics = result;
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
	`Listening on port ${port}...`;
});
