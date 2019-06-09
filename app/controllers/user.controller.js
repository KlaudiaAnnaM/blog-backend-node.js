const User = require('../models/user.model');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Pola nie mogą być puste"
        });
    };

    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Nie udało się zarejestrować"
            });
        });

}

exports.findAll = (req, res) => {
    User.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Upss, pojawił się błąd"
            })
        });
};

exports.findOne = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.find({ email: email, password: password }, function (err, user) {
        if (err) {
            return res.status(500).send({
                message: err.message || "Upss, pojawił się błąd"
            });
        };

        if (!user || user.length < 1) {
            return res.status(404).send({
                message: "Nie znaleziono użytkownika"
            });
        };

        return res.status(200).send(user);
    });
}