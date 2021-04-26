mod config;
mod db;
mod graphql;
mod handlers;
mod models;
use crate::graphql::{create_schema, Schema};
use crate::models::Data;
use actix_cors::Cors;
use actix_web::*;
use dotenv::dotenv;
// use std::sync::Mutex;
use tokio_postgres::NoTls;


#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let config = crate::config::Config::from_env().unwrap();

    let pool = config.pg.create_pool(NoTls).unwrap();
    // let pool2 = pool.into_inner();
    let client = pool.get().await.unwrap();
    let schema = std::sync::Arc::new(create_schema());

    let allowed_url = String::from(config.server.allowed_url);

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&allowed_url)
            .allowed_origin_fn(|origin, _req_head| origin.as_bytes().ends_with(b".rust-lang.org"))
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);

        // let data = web::Data::new(Mutex::new(Data {
        //     pool: pool.clone(),
        //     schema: schema.clone(),
        // }));

        let data = Data {
            pool: std::sync::Arc::new(pool.clone()),
            schema: schema.clone(),
        };

        App::new()
            .wrap(cors)
            .data(data)
            .route("/graphql", web::post().to(handlers::graphql))
        // .route("/graphiql", web::post().to(graphiql))
    })
    .bind(format!("{}:{}", config.server.host, config.server.port))?
    .run()
    .await
}
