create database lifelessons;

use lifelessons;


create table users(
    personID INTEGER AUTO_INCREMENT,
    name varchar(255),
    surname varchar(255),
    username varchar(15),
    email varchar(255),
    password varchar(20),
    PRIMARY KEY (personID)
);


create table posts(
    postID INTEGER primary key AUTO_INCREMENT,
    userID INTEGER ,
    title VARCHAR(150),
    story VARCHAR(3000),
    fox varchar(300), 
    time timestamp not null default current_timestamp,
    FOREIGN KEY (userID) REFERENCES users(personID)
);

