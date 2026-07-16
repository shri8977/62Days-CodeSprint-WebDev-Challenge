const express = require('express');
const {
  listMine,
  getSnippet,
  getShared,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  listMeta,
  listTags,
} = require('../controllers/snippetController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/meta/languages', listMeta);
router.get('/share/:shareId', getShared);
router.get('/tags/mine', protect, listTags);
router.get('/', protect, listMine);
router.get('/:id', protect, getSnippet);
router.post('/', protect, createSnippet);
router.put('/:id', protect, updateSnippet);
router.delete('/:id', protect, deleteSnippet);

module.exports = router;
