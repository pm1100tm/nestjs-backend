# NestJS Backend

## Description

- NestJS Backend Project with TypeScript

## Start with docker compose

```shell
docker compose --build
docker compose up -d
```

### In case that Docker is not installed

```bash
npm install

npm run start
npm run start:dev
npm run start:prod
```

### Run Test(TODO!)

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
ENV=local # local or dev or prod

# app
HOST=
PORT=

# db
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

## Reference

- [NestJS Docs](https://docs.nestjs.com/)
- [wanago](https://wanago.io/)
- [TypeORM](https://typeorm.io/)
- [TypeORM API Docs](https://orkhan.gitbook.io/typeorm/docs/repository-api)
- [Typeorm naming strategies](https://www.npmjs.com/package/typeorm-naming-strategies)
- [Typeorm Transactional](https://www.npmjs.com/package/typeorm-transactional)
- [Typeorm Migration](https://whyhard.tistory.com/59)
