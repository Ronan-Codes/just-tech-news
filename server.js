const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// !!! review what this is !!!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// if force: was true, database connection must sync with the model definitions and associations.
// turn on connection to db and server.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });


/* turn force: false after updating, Dropping all the tables every time the application
restarts is no longer necessary and in fact will constantly drop all the
entries and seed data we enter,
which can get very annoying. */

/* repopulate the user table with a user. Failing to do so will result in a
Foreign Key Constraint Error due to the association that states a post must have a user. */
