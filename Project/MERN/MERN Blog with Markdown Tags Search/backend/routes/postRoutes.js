const express = require('express');
const {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  listTags,
  myPosts,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/tags/all', listTags);
router.get('/mine/list', protect, myPosts);
router.get('/', listPosts);
router.get('/:idOrSlug', getPost);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
