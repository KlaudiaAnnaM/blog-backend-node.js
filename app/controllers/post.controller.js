const Post = require('../models/post.model');

// controllers for methods in post.routes.js
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Zawartość postu nie może być pusta"
        });
    };
    const post = new Post({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        imgUrl: req.body.imgUrl
    });

    post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Upss, pojawił się błąd, nie udało się dodać posta"
            });
        })
};

exports.findAll = (req, res) => {
    Post.find()
        .then(posts => {
            res.send(posts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Upss, pojawił się błąd"
            })
        });
};

exports.findOne = (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "Nie znaleziono posta"
                });
            }
            res.send(post);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Nie znaleziono posta"
                });
            }
            return res.status(500).send({
                message: "Upss, pojawił się błąd"
            });
        });
};

exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Zawartość nie może być pusta"
        });
    }

    Post.findByIdAndUpdate(req.params.postId, {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        imgUrl: req.body.imgUrl
    }, {new: true})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Nie znaleziono posta"
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Nie znaleziono posta"
            });                
        }
        return res.status(500).send({
            message: "Upss, pojawił się błąd"
        });
    });
};

exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "Nie znaleziono posta"
                });
            }
            res.send({ message: "Post został usunięty!" })
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return status(404).send({
                    message: "Nie znaleziono posta"
                });
            }
            return res.status(500).send({
                message: "Nie można usunąć posta"
            });
        });
};
