use serde::{Serialize, Deserialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table="todo_list")]
pub struct Level {
    pub id: i32,
    pub creator: String,
    pub start_code: String,
    pub end_code: String,
}

#[derive(Deserialize)]
pub struct InsertLevel {
    pub creator: String,
    pub end_code: String,
    pub start_code: String,
}

