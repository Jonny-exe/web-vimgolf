use crate::models::{Level, Score};
use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;

pub async fn get_levels(client: &Client) -> Vec<Level> {
    let statement = client.prepare("select * from levels").await.unwrap();
    let levels = client
        .query(&statement, &[])
        .await
        .unwrap()
        .iter()
        .map(|row| Level::from_row_ref(row).unwrap())
        .collect::<Vec<Level>>();

    levels
}

pub async fn get_scores(client: &Client) -> Vec<Score> {
    let statement = client.prepare("select * from scores").await.unwrap();
    let scores = client
        .query(&statement, &[])
        .await
        .unwrap()
        .iter()
        .map(|row| Score::from_row_ref(row).unwrap())
        .collect::<Vec<Score>>();

    scores
}

pub async fn insert_level(
    client: &Client,
    creator: String,
    startcode: String,
    endcode: String,
    name: String,
) -> Vec<Level> {
    let statement = client.prepare("insert into levels (creator, endcode, startcode, name) values ($1, $2, $3, $4) returning id, endcode, startcode, creator, name").await.unwrap();

    let level = client
        .query(&statement, &[&creator, &endcode, &startcode, &name])
        .await
        .expect("Error getting levels")
        .iter()
        .map(|row| Level::from_row_ref(row).unwrap())
        .collect::<Vec<Level>>();
        // .pop()
        // .ok_or(std::io::Error::new(
        //     std::io::ErrorKind::Other,
        //     "Error inserting level",
        // ));
    return level;
}

pub async fn insert_score(
    client: &Client,
    username: String,
    score: i32,
    challengeid: i32
) -> Vec<Score> {
    let statement = client.prepare("insert into scores (username, score, challengeid) values ($1, $2, $3) returning id, username, score, challengeid").await.unwrap();

    let score = client
        .query(&statement, &[&username, &score, &challengeid])
        .await
        .expect("Error getting levels")
        .iter()
        .map(|row| Score::from_row_ref(row).unwrap())
        .collect::<Vec<Score>>();
        // .pop()
        // .ok_or(std::io::Error::new(
        //     std::io::ErrorKind::Other,
        //     "Error inserting level",
        // ));
    return score;
}