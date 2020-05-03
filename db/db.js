const mysql = require("mysql");

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "kimandnickarecool",
	database: "wordbox"
});

// 1. Define connection
// 2. Connect to the database
// 3. Query using that connection

con.connect(() => {
	console.log(`Connected to database!`);
});

const addSong = (id, title, artist, lyrics) => {
	return new Promise((resolve, reject) => {
		con.query(
            `INSERT IGNORE INTO lyrics (id, title, artist, lyrics) VALUES ("${id}", "${title}", "${artist}", "${lyrics}");`, 
            (error, result, field) => {
				if (error) {
					reject(error);
				} else {
					console.log(result);
					resolve(result);
				}
			}
		);
	});
};

const getLyrics = id => {
	return new Promise((resolve, reject) => {
		con.query(
			`SELECT lyrics FROM lyrics WHERE id = "${id}";`,
			(error, result, field) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			}
		);
	});
};

module.exports = { addSong, getLyrics };
