use crate::models::{Level};
use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;
use std::io;

pub async fn get_levels(client: &Client) -> Result<Vec<Level>, io::Error> {
    let statement = client.prepare("select * from levels").await.unwrap();

    let levels = client.query(&statement, &[])
        .await
        .expect("Error gettin levels")
        .iter()
        .map(|row| Level::from_row_ref(row).unwrap())
        .collect::<Vec<Level>>();

    Ok(levels)
}

pub async fn insert_level(client: &Client, creator: String, end_code: String, start_code: String) -> Result<Level, io::Error> {
    let statement = client.prepare("insert into levels (creator, end_code, start_code) values ($1, $2, $3) returning id, end_code, start_code, creator").await.unwrap();

    client.query(&statement, &[&creator, &end_code, &start_code])
        .await
        .expect("Error gettin levels")
        .iter()
        .map(|row| Level::from_row_ref(row).unwrap())
        .collect::<Vec<Level>>()
        .pop()
        .ok_or(io::Error::new(io::ErrorKind::Other, "Error inserting level"))

}