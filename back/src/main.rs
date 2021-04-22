mod config;
mod db;
mod handlers;
mod models;

use actix_cors::Cors;
use actix_web::{http, web, App, HttpServer, Responder, Result};
use dotenv::dotenv;
use serde::Deserialize;

// pub mod schema;

use crate::handlers::*;
use crate::models::Level;
use tokio_postgres::NoTls;

// use diesel::prelude::*;
// use diesel::pg::PgConnection;
// use dotenv::dotenv;
// use std::env;

async fn index() -> impl Responder {
    "Hello world!"
}

#[derive(Deserialize)]

struct Req {
    username: String,
}

// async fn handlePost(request: web::Json<Req>) -> Result<String> {
//     Ok(format!("Welcome {}!", request.username))
// }
async fn handlePost(request: web::Json<Req>) -> impl Responder {
    web::HttpResponse::Ok().json(Level {
        creator: "Hello".to_string(),
        end_code: "the end codd".to_string(),
        start_code: "the start code".to_string(),
        id: 1,
        name: "the name".to_string(),
    })
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let config = crate::config::Config::from_env().unwrap();

    let pool = config.pg.create_pool(NoTls).unwrap();

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_origin_fn(|origin, _req_head| origin.as_bytes().ends_with(b".rust-lang.org"))
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            // prefixes all resources and routes attached to it...
            // ...so this handles requests for `GET /app/index.html`
            .wrap(cors)
            .data(pool.clone())
            .route("/app", web::get().to(index))
            .route("/post", web::post().to(handlePost))
            .route("/levels{_:/?}", web::get().to(get_levels))
            .route("/levels{_:/?}", web::post().to(insert_level))
            .route("/scores{_:/?}", web::post().to(insert_score))
            .route("/scores/get{_:/?}", web::post().to(get_scores))
    })
    .bind(format!("{}:{}", config.server.host, config.server.port))?
    .run()
    .await
}

// pub fn establish_connection() -> PgConnection {
//     dotenv().ok();

//     let database_url = env::var("DATABASE_URL")
//         .expect("DATABASE_URL must be set");
//     PgConnection::establish(&database_url)
//         .expect(&format!("Error connecting to {}", database_url))
// }
