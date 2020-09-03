# lireddit clone

## Type-GraphQL

Explicit type setting for nullable values.
@Field(() => [Error], { nullable: true })

## Connect to Postgres

Launch Postgres
`/Applications/Postgres.app/Contents/Versions/12/bin/psql -p5432 "austin"`
Connect to DB
\c <db_name>

## Connect to Redis

1. `brew services start redis`
2. `redis-server`