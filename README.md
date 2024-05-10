# NestJS Backend

## Description

- NestJS Backend Project with TypeScript

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

---

### .env

- src/configs
  - .env.local
  - .env.dev
  - .env.prod

```plain
# local or dev or prod
ENV=local

# app
HOST=
PORT=

# db
DB_TYPE=postgres
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

# jwt
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRED_IN=3600
JWT_EXPIRED_IN_FOR_REFRESH=3600 # It should be set more bigger value
```

---

### TypeORM

- [TypeORM](https://typeorm.io/)
- [TypeORM API Docs](https://orkhan.gitbook.io/typeorm/docs/repository-api)
- [Typeorm naming strategies](https://www.npmjs.com/package/typeorm-naming-strategies)
- [Typeorm Transactional](https://www.npmjs.com/package/typeorm-transactional)
- [Typeorm Migration](https://whyhard.tistory.com/59)
