const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cookieRoutes = require('./routers/cookieRoutes')
const bakeryRoutes = require('./routers/bakeryRoutes')
const userRoutes = require('./routers/userRoutes')
const { localStrategy, jwtStrategy } = require('./middleware/passport');
const db = require('./db/models')
const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
// Middlewares that run before anything go here

app.use(userRoutes);
app.use('/cookies', cookieRoutes);
app.use('/bakeries', bakeryRoutes);
app.use('/media', express.static(path.join(__dirname, "media")));

const run = async () => {
    try {
        await db.sequelize.sync({alter: true});
        console.log("Connection to the database successful!");
    } catch (error) {
        console.error("Error connecting to the database: ", error);
    }
};

app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
});

// Middleware that runs if no routes have been matched
app.use((req, res, next) => {
    res.status(404).json({message: "Page not found"});
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message || "Internal Server Error",
    });
});

run();
