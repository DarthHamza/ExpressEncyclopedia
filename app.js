const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieRoutes = require('./routers/cookieRoutes') 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/cookies', cookieRoutes);


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
})