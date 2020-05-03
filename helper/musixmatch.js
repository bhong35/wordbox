const axios = require("axios");
const config = require("../config");

const musixMatch = (title, artist, callback) => {
	axios
		.get(
			`https://api.musixmatch.com/ws/1.1/track.search?apikey=${config.TOKEN}&q_artist=${artist}&q_track=${title}&page_size=3&page=1&s_track_rating=desc`
		)
		.then(response => {
			console.log(
				response.data.message.body.track_list[0].track.track_id
			);
			callback(
				null,
				response.data.message.body.track_list[0].track.track_id
			);
		})
		.catch(error => {
			console.log("error is catch block of musixmatch fx");
			callback(error, null);
		});
};

const musixMatchTrack = (id, callback) => {
	axios
		.get(
			`https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${config.TOKEN}&track_id=${id}`
		)
		.then(response => {
			// console.log(
			// 	"RESPONSE FROM musixMatchTrack",
			// 	response.message.body.lyrics.lyrics_body
			// );
			callback(null, response.data.message.body.lyrics.lyrics_body);
		})
		.catch(error => {
			callback(error, null);
		});
};

module.exports = { musixMatch, musixMatchTrack };
