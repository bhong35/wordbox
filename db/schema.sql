DROP DATABASE IF EXISTS wordbox;

CREATE DATABASE wordbox;
USE wordbox;

CREATE TABLE lyrics
(
    id INT
        PRIMARY KEY,
    title VARCHAR
    (40),
    artist VARCHAR
    (40),
    lyrics VARCHAR
    (8000)
);