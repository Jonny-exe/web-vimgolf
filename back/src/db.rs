use crate::models::{Level, Score};
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

pub async fn get_scores(client: &Client) -> Result<Vec<Score>, io::Error> {
    let statement = client.prepare("select * from scores").await.unwrap();

    let levels = client.query(&statement, &[])
        .await
        .expect("Error gettin levels")
        .iter()
        .map(|row| Score::from_row_ref(row).unwrap())
        .collect::<Vec<Score>>();

    Ok(levels)
}

pub async fn insert_level(client: &Client, creator: String, end_code: String, start_code: String, name: String) -> Result<Level, io::Error> {
    let statement = client.prepare("insert into levels (creator, end_code, start_code, name) values ($1, $2, $3, $4) returning id, end_code, start_code, creator, name").await.unwrap();

    client.query(&statement, &[&creator, &end_code, &start_code, &name])
        .await
        .expect("Error getting levels")
        .iter()
        .map(|row| Level::from_row_ref(row).unwrap())
        .collect::<Vec<Level>>()
        .pop()
        .ok_or(io::Error::new(io::ErrorKind::Other, "Error inserting level"))

}

pub async fn insert_score(client: &Client, username: String, score: i32, challenge_id: i32) -> Result<Score, io::Error> {
    let statement = client.prepare("insert into scores (username, score, challenge_id) values ($1, $2, $3) returning id, username, challenge_id, score").await.unwrap();

    client.query(&statement, &[&username, &score, &challenge_id])
        .await
        .expect("Error getting scores")
        .iter()
        .map(|row| Score::from_row_ref(row).unwrap())
        .collect::<Vec<Score>>()
        .pop()
        .ok_or(io::Error::new(io::ErrorKind::Other, "Error inserting level"))
}