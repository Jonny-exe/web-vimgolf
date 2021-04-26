use std::sync::Arc;
use actix_web::web;
use crate::graphql::Schema;
use deadpool_postgres::Pool;
use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;

#[derive(Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table = "todo_list")]
pub struct Level {
  pub id: i32,
  pub creator: String,
  pub startcode: String,
  pub endcode: String,
  pub name: String,
}

#[derive(Serialize, Deserialize, PostgresMapper)]
#[pg_mapper(table = "todo_list")]
pub struct Score {
  pub id: i32,
  pub challengeid: i32,
  pub score: i32,
  pub username: String,
}

#[derive(Clone)]
pub struct QContext {
  pub dbpool: Arc<Pool>,
}

pub struct Data {
  pub pool: Arc<Pool>,
  pub schema: std::sync::Arc<Schema>,
}
