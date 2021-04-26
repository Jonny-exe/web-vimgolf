use juniper::{EmptyMutation, EmptySubscription, FieldResult, RootNode};
// use graphql::{EmptyMutation, EmptySubscription, FieldResult, RootNode};
use crate::db;
use crate::models::{Level, QContext, Score};
use deadpool_postgres::{Client};
impl juniper::Context for QContext {}


#[juniper::graphql_object(description = "A level")]
impl Level {
  pub fn id(&self) -> i32 {
    self.id
  }

  pub fn creator(&self) -> &str {
    self.creator.as_str()
  }

  pub fn startcode(&self) -> &str {
    self.startcode.as_str()
  }

  pub fn endcode(&self) -> &str {
    self.endcode.as_str()
  }
  pub fn name(&self) -> &str {
    self.name.as_str()
  }
}

#[juniper::graphql_object(description = "A level")]
impl Score {
  pub fn id(&self) -> i32 {
    self.id
  }

  pub fn challengeid(&self) -> i32 {
    self.challengeid
  }

  pub fn score(&self) -> i32 {
    self.score
  }

  pub fn username(&self) -> &str {
    self.username.as_str()
  }
}

pub struct Query;
#[juniper::graphql_object(
  context = QContext,
)]
impl Query {
  async fn levels(context: &QContext) -> FieldResult<Vec<Level>> {
    let client: Client = context.dbpool.get().await?;
    Ok(db::get_levels(&client).await)
  }

  async fn scores(context: &QContext) -> FieldResult<Vec<Score>> {
    let client: Client = context.dbpool.get().await?;
    Ok(db::get_scores(&client).await)
  }

  async fn insertlevel(
    context: &QContext,
    name: String,
    creator: String,
    startcode: String,
    endcode: String,
  ) -> FieldResult<Vec<Level>> {
    let client: Client = context.dbpool.get().await?;
    let levels: Vec<Level> = db::insert_level(
      &client,
      creator.to_string(),
      startcode.to_string(),
      endcode.to_string(),
      name.to_string(),
    )
    .await;
    return Ok(levels);
  }

  async fn insertscore(
    context: &QContext,
    username: String,
    score: i32,
    challengeid: i32,
  ) -> FieldResult<Vec<Score>> {
    let client: Client = context.dbpool.get().await?;
    let levels: Vec<Score> = db::insert_score(
      &client,
      username.to_string(),
      score,
      challengeid
    )
    .await;
    return Ok(levels);
  }
}

pub type Schema = RootNode<'static, Query, EmptyMutation<QContext>, EmptySubscription<QContext>>;
pub fn create_schema() -> Schema {
  Schema::new(Query {}, EmptyMutation::new(), EmptySubscription::new())
}
