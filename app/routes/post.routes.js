module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');

    // create post
    app.post('/posts', posts.create);

    // get all posts
    app.get('/posts', posts.findAll);

    //get post by postId
    app.get('/posts/:postId', posts.findOne);

    // update post with postId
    app.put('/posts/:postId', posts.update);

    // delete post with postId
    app.delete('/posts/:postId', posts.delete);

}