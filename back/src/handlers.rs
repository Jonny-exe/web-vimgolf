use crate::models::{Level, InsertLevel, InsertScore};
use crate::db;
use deadpool_postgres::{Pool, Client};
use actix_web::{web, Responder, HttpResponse};

pub async fn get_levels(db_pool: web::Data<Pool>) -> impl Responder {
    let client: Client = 
        db_pool.get().await.expect("Error connecting to db");

    let result = db::get_levels(&client).await;
    match result {
        Ok(levels) => HttpResponse::Ok().json(levels),
        Err(_) => HttpResponse::InternalServerError().into()
    }
}

pub async fn get_scores(db_pool: web::Data<Pool>) -> impl Responder {
    let client: Client = 
        db_pool.get().await.expect("Error connecting to db");

    let result = db::get_scores(&client).await;
    match result {
        Ok(levels) => HttpResponse::Ok().json(levels),
        Err(_) => HttpResponse::InternalServerError().into()
    }
}

pub async fn insert_level(db_pool: web::Data<Pool>, json: web::Json<InsertLevel>) -> impl Responder {
    let client: Client = 
        db_pool.get().await.expect("Error connecting to db");

    let result = db::insert_level(&client, json.creator.clone(), json.start_code.clone(), json.end_code.clone(), json.name.clone()).await;

    match result {
        Ok(levels) => HttpResponse::Ok().json(levels),
        Err(_) => HttpResponse::InternalServerError().into()
    }
}

pub async fn insert_score(db_pool: web::Data<Pool>, json: web::Json<InsertScore>) -> impl Responder {
    let client: Client = 
        db_pool.get().await.expect("Error connecting to db");

    let result = db::insert_score(&client, json.username.clone(), json.score.clone(), json.challenge_id.clone()).await;

    match result {
        Ok(levels) => HttpResponse::Ok().json(levels),
        Err(_) => HttpResponse::InternalServerError().into()
    }
}