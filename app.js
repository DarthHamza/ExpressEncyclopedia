const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieRoutes = require('./routers/cookieRoutes')
const db = require('./db/models')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/cookies', cookieRoutes);

const PORT = 8000;

const run = async () => {
    try {
        await db.sequelize.sync();
        console.log("Connection to the database successful!");
    } catch (error) {
        console.error("Error connecting to the database: ", error);
    }
};

app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
})
  
run();
