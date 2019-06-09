module.exports = (app) => {
    const user = require('../controllers/user.controller');

    //register user
    app.post('/register/user', user.create);

    app.get('/users', user.findAll);

    app.post('/login', user.findOne);

}