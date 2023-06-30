<h1 align="center">MotorShop</h1>

<blockquote>
    <br>
        <p>MotorShop is an application that allows the registration and management of regular users and car sellers. Sellers can create car ads for sale and manage their ads through a control panel. Users can register, buy available cars, visit the seller’s profile, and view detailed information about each ad, including description, photos, values, and comments. The home page displays cars recently added by sellers and offers various search filters.</p>
    <br>
</blockquote>

<blockquote>
    
This repository contains the code for the back-end of the application. The front-end code can be found in the [MotorShop repository](https://github.com/G9-fullstack/motorshop-app).
    
</blockquote>

<br>

<h2>Features</h2>

- Secure registration and login system for regular users and car sellers;
- Personal dashboard for sellers to manage their car ads;
- Sellers can create, edit, and delete car ads;
- Detailed information about each ad, including description, photos, values, and comments;
- Home page displays cars recently added by sellers and offers various search filters;
- Users can buy available cars and visit the seller’s profile;
- Developed with modern technologies such as Nest.js, Prisma.js, TypeScript, and PostgreSQL.

<br>

<h2>Live Version</h2>

Visit the live version of the application hosted at [MotorShop - Website](https://motorshop-app.vercel.app/) to see it in action.

<br>

<h2>Configuration</h2>

Before starting to use the project, it is necessary to configure some environment variables. Create a `.env` file in the root of the project with the following information:

~~~bash
APP_PORT=<port>
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
SECRET_KEY=<secret_key>
~~~

<br>

<h2>Installation</h2>

Installing and running the project is easy and fast. Just follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies: `yarn install` or `npm install`.
3. Make sure you have a PostgreSQL database set up and update the DATABASE_URL variable in the .env file with your database information.
4. Run `yarn prisma migrate dev` or `npx prisma migrate dev` to apply the database migrations.
5. Start the development server by running `yarn dev` or `npm run dev`.

The application should now be running on` http://localhost:<port>`, where `<port>` is the value of the APP_PORT variable in the .env file.

<br>

<h2>Database Commands</h2>

The project includes some commands for managing the database. Here is a list of available commands:

- `prisma migrate dev --name <migration_name>`: generates a new migration with the specified name and applies it to the development database.
- `prisma migrate dev`: applies pending migrations to the development database.
- `prisma migrate reset`: resets the development database and applies all migrations from scratch.

To use these commands, simply prefix the `prisma` command with your package manager (`yarn` or `npx`) and type the desired command into your terminal. For example:

~~~bash
npx prisma migrate dev --name create_users_table
npx prisma migrate dev
npx prisma migrate reset
~~~

<br>

<h2>Technologies used</h2>

- [Nest.js](https://nestjs.com/): progressive Node.js framework for building efficient and scalable server-side applications.
- [Prisma.js](https://www.prisma.io/): next-generation ORM for Node.js and TypeScript.
- [TypeScript](https://www.typescriptlang.org/): typed programming language that increases code productivity and readability.
- [PostgreSQL](https://www.postgresql.org/): robust and reliable relational database management system.

<br>

<h2>API Documentation</h2>

The API documentation is available on Swagger. You can access it through the deploy link or locally on your computer.

- Deploy link: https://motorshop-web-api.onrender.com/api
- Localhost: `http://localhost:<port>/api`

Replace `<port>` with the value of the APP_PORT variable in the .env file.

<br>

<h2>Contributing</h2>

To contribute to this project, please follow these guidelines:

1. Fork the repository
2. Create a new branch: `git checkout -b feat/yourFeatureName`
3. Make your changes and commit them using Conventional Commits
4. Push to the branch: `git push origin feat/yourFeatureName`
5. Submit a pull request
