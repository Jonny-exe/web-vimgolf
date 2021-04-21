use serde::{Serialize, Deserialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table="todo_list")]
pub struct Level {
    pub id: i32,
    pub creator: String,
    pub start_code: String,
    pub end_code: String,
    pub name: String,
}

#[derive(Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table="todo_list")]
pub struct Score {
    pub id: i32,
    pub username: String,
    pub score: i32,
    pub challenge_id: i32,
}

#[derive(Deserialize)]
pub struct InsertLevel {
    pub creator: String,
    pub end_code: String,
    pub start_code: String,
    pub name: String,
}

#[derive(Deserialize)]
pub struct InsertScore {
    pub username: String,
    pub challenge_id: i32,
    pub score: i32,
}

