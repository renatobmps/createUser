This API was made with Bun instead node. To run it, follow steps below:

- [Install Bun](#install-bun)
- [Installing dependencies](#installing-dependencies)
- [Define environment variables](#define-environment-variables)
- [Starting database](#starting-database)
- [Running server](#running-server)
- [Running tests](#running-tests)
- [About tests](#about-tests)
- [About production version](#about-production-version)

## Install Bun

If you have no Bun installed, you can do it with:

```curl -fsSL https://bun.sh/install | bash```

or following the [official documentation](https://bun.sh/). To confirm the installation, you can print the version or manual with:

```bun --version```

or

```bun --help```

Bun can be a substitute for node running JavaScript out of the browser, so you can run scripts directly, create a server, API and much more.

## Installing dependencies

Install dependencies with Bun is similar the npm. Instead you run `npm install`, you can do:

```bun install```

And that's it, you done.

## Define environment variables

You can find a file called `.env.example` inside de project and you can use it to see all the variables you should to define inside a `.env` file to run the project, because it is not tracked for git. To know more about it:

- **DATABASE_URL**: This value is used for Prisma ORM to connect in a postgresql server. You can see more about it on [official Prisma documentation](https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-url).
- **HOST**: This is you server host, on general, http://localhost is used. If you run locally and you defined the PORT as 3000, for example, your host should be `http://localhost:3000`, `http://0.0.0.0:3000` or `http://127.0.0.1:3000`.
- **MAIL_FROM**: This is the e-mail address to send the API e-mails.
- **MAIL_HOST**: This is the host of e-mail service. If you're using MaiTrap, for example, you should to define it as `sandbox.smtp.mailtrap.io`, but each service have a different configuration.
- **MAIL_PASSWORD**: This is the password to access your e-mail provider.
- **MAIL_PORT**: This is the e-mail provided PORT. The MailTrap uses 2525.
- **MAIL_USER**: This is your e-mail provided login, to use together `MAIL_PASSWORD`
- **PORT**: Service port to run your server. You can use it accordingly your operation system permissions.
- **POSTGRES_HOST**: Host to connect the Docker Postgresql server.
- **POSTGRES_PORT**: Port to connect Docker Postgresql server. The pattern is use 5432, but can be different accordingly service.
- **POSTGRES_USER**: Your postgres username to connect Docker Postgresql server.
- **POSTGRES_DB**: Database name that will be used.
- **POSTGRES_PASSWORD**: The password to connect Docker Postgresql server.

## Starting database

If all done, you should be able to connect to the database. If is the first time you run this app, is necessary to create the first database migration and to do it, you can run `migrate` script. A example to do it: ```bun run migrate dev --name init```. If you don't know what you are doing, the migrate is something like a git commit. When you run it, the Prisma will read the database definition to generate a postgresql script to run it properly and the database is the same independently the environment. Is recommended to read the [Prisma documentation](https://www.prisma.io/docs).

## Running server

You can run the server locally running:

```bun run dev```

## Running tests

To run all tests:

```bun run test```

If you want to run in watch mode, it will first start the dev server:

```bun run test:watch```

## About tests

The tests was not implemented 100%. The script test is running all test types, unit, integrated and e2e and there is not 100% covered. If you want to support it, a PR is welcome! :D

## About production version

For now, I don't planning to run it in production server, so it's not totally configured to it, and as the Bun is not fully consolidated yet, its use in production is not recommended.

#HappyCoding