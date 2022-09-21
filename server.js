const express = require('express');
const routes = require('./routes');
// import sequelizeConnection connection
const sequelizeConnection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelizeConnection models to the database, then turn on the server
sequelizeConnection.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening ${PORT}, open in insomnia`));
});
