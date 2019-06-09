const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch((err) => {
    console.log('Could not connectet with database, ...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Blog aplication" });
});

var cors = require('cors');
app.use(cors({origin: '*'}));

require('./app/routes/post.routes')(app);
require('./app/routes/user.routes')(app);

app.listen(3000, () => {
    console.log('Server is listening on a port 3000');
});
