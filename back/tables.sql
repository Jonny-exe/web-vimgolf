CREATE TABLE levels (
    id serial primary key,
    creator varchar,
    name varchar,
    startcode varchar,
    endcode varchar
);

CREATE TABLE scores (
    id serial primary key,
    score int,
    username varchar,
    challengeid int
);
