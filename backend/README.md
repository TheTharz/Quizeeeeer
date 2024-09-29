# MongoDB Local Setup

This guide explains how to set up a local MongoDB database using `mongosh`, create a new database, add a user with a strong password, and configure it for use in your project.

## Prerequisites

- Ensure MongoDB is installed on your system. You can find the installation instructions for different operating systems [here](https://www.mongodb.com/docs/manual/installation/).

## Steps to Create a Database and a User

### 1. Start MongoDB Shell

First, make sure the MongoDB service is running. Then, open the terminal and start the MongoDB shell (`mongosh`) by typing:

```bash
mongosh
```

This will connect you to your local MongoDB instance on `localhost:27017` by default.

### 2. Create a New Database

To create a new database, use the following command in the MongoDB shell:

```bash
use quizApp
```

This command switches the context to a new database called `quizApp`. MongoDB will create the database automatically once data is inserted.

### 3. Create a User for the Database

To add a user with read and write access to the `quizApp` database, run the following command:

```bash
db.createUser({
  user: "dev",
  pwd: "D3vQuizApp!2024$",  // Replace with your own strong password
  roles: [{ role: "readWrite", db: "quizApp" }]
})
```

- `user`: This is the username, in this case, `dev`.
- `pwd`: A strong password. You can use the suggested password `D3vQuizApp!2024$` or replace it with your own.
- `roles`: This specifies the permissions. The `readWrite` role grants the user the ability to read and write to the `quizApp` database.

### 4. Verify the User

To verify that the user has been successfully created, run:

```bash
db.getUsers()
```

This will list all the users associated with the current database (`quizApp`).

### 5. Exit MongoDB Shell

Once the setup is done, you can exit the MongoDB shell by typing:

```bash
exit
```

## Using the User in Your Project

To connect your application to MongoDB using the newly created `dev` user and the `quizApp` database, you need to use a MongoDB connection string like this:

```bash
mongodb://dev:D3vQuizApp!2024$@localhost:27017/quizApp
```

You can use this connection string in your application to access the database with the correct credentials.

### Example in Node.js (using `mongoose`)

If you are using Node.js and `mongoose`, you can use the following example to connect to the database:

```javascript
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://dev:D3vQuizApp!2024$@localhost:27017/quizApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error', err));
```

## Additional Security Considerations

- **Keep your database credentials secure:** Ensure your password is not exposed in public repositories or version control systems. Use environment variables for storing sensitive credentials.
- **Regularly update your password:** To enhance security, it’s a good practice to rotate passwords regularly.
