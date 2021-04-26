// use crate::graphql::Schema;
use crate::models::{Data, QContext, Level};
use crate::db;
use deadpool_postgres::{Pool, Client};
use actix_web::*;
// use deadpool_postgres::Pool;
use juniper::http::GraphQLRequest;

pub async fn graphql(
    data: web::Json<GraphQLRequest>,
    app_data: web::Data<Data>,
) -> Result<HttpResponse, Error> {
    let context = QContext {
        dbpool: app_data.pool.clone(),
    };

    // let user = web::block(move || {
    //     let res = data.execute(&app_data.schema, &context);
    //     Ok::<_, serde_json::error::Error>(serde_json::to_string(&res))
    // })
    // .await?;

    let res = data.execute(&app_data.schema, &context).await;
    let json = serde_json::to_string(&res).map_err(error::ErrorInternalServerError)?;

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(json))
}

pub async fn get_levels(db_pool: Pool) -> Vec<Level> {
    let mut client: Client =
        db_pool.get().await.expect("Error connecting to db");

    // db::get_levels(&client).await

    vec![Level {
        id: 1,
        creator: "hello".to_string(),
        endcode: "hello".to_string(),
        startcode: "hello".to_string(),
        name: "hello".to_string(),
    }]
    // match result {
    //     Ok(levels) => HttpResponse::Ok().json(levels),
    //     Err(_) => HttpResponse::InternalServerError().into()
    // }
}
