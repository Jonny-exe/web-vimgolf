// use crate::graphql::Schema;
use crate::models::{Data, QContext};
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
