# Apollo Auth Starter

Apollo Express Server
MikroORM
Postgresql
Redis
GraphQL
Type-GraphQL

## Getting Started

1. Clone the repository
2. Install dependencies
3. Create and populate .env
4. Activate Postgres & Redis
5. execute `yarn create:migration` to sync db
6. execute `yarn watch` to transpile into `dist/`
7. execute `yarn dev` to run the server

### Nodemailer

1. Config `src/utils/sendEmail.ts` to generate example account (read comments)
2. Call sendMail("email@example.com", "html string") inside of bootStrap() in `src/index.ts`
3. Config the generated accounts credentials in the sendEmail
