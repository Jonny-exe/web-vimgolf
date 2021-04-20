CREATE TABLE levels (
    id serial primary key,
    creator varchar,
    name varchar,
    start_code varchar,
    end_code varchar
);

CREATE TABLE scores (
    id serial primary key,
    score int,
    username varchar,
    challenge_id int
);