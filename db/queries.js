const knex = require('./knex')

module.exports = {

  createUser(user) {
    return knex('mom').insert(user, '*');
  },
  getUserByEmail(email) {
    return knex('mom').where('email', email).first();
  },
  getAllMoms() {
    return knex('mom');
  },
  getPosts() {
    return knex('posts')
  },
  getMomById(id) {
    return knex('mom').where('id', id)
  },
  getCommentsByPostId(id) {
    return knex('comments')
      .join('posts', 'posts.id', 'comments.posts_id')
      .select('posts.id as post_id', 'comments.comment as comment', 'comments.mom_id as mom_id')
      .where('posts_id', id)
  },
  getCommentsAndPosts() {
    return knex('posts')
      .join('comments', 'comments.id', 'posts.id')
      .select('posts.post as post', 'posts.id as post_id', 'comments.comment as comment', 'comments.mom_id as mom_id')

  },
  getPostById(id) {
    return knex('posts').where('id', id)
  },
  createPost(post) {
    return knex('posts').insert(post, '*')
  },
  createComment(comment) {
    return knex('comments').insert(comment, '*')
  }
}
