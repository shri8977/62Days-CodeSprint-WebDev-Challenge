const mongoose = require('mongoose');
const Post = require('../models/Post');

const listPosts = async (req, res) => {
  try {
    const { q, tag, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(50, Math.max(1, Number(limit) || 10));
    const filter = { published: true };

    if (tag) {
      filter.tags = String(tag).toLowerCase().trim();
    }

    if (q && String(q).trim()) {
      filter.$text = { $search: String(q).trim() };
    }

    const query = Post.find(filter).populate('author', 'name email')

    if (q && String(q).trim()) {
      query.select({ score: { $meta: 'textScore' } }).sort({
        score: { $meta: 'textScore' },
      })
    } else {
      query.sort({ createdAt: -1 })
    }

    const [posts, total] = await Promise.all([
      query.skip((pageNum - 1) * limitNum).limit(limitNum),
      Post.countDocuments(filter),
    ]);

    res.json({
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch posts.' });
  }
};

const getPost = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const conditions = [{ slug: idOrSlug }];
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      conditions.push({ _id: idOrSlug });
    }

    const post = await Post.findOne({ $or: conditions }).populate(
      'author',
      'name email'
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.json({ post });
  } catch (error) {
    res.status(404).json({ message: 'Post not found.' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, excerpt, tags, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const post = await Post.create({
      title,
      content,
      excerpt,
      tags: Array.isArray(tags)
        ? tags
        : String(tags || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
      published: published !== false,
      author: req.user._id,
    });

    await post.populate('author', 'name email');
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create post.' });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    if (String(post.author) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed to edit this post.' });
    }

    const { title, content, excerpt, tags, published } = req.body;

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (published !== undefined) post.published = published;
    if (tags !== undefined) {
      post.tags = Array.isArray(tags)
        ? tags
        : String(tags)
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
    }

    await post.save();
    await post.populate('author', 'name email');
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update post.' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    if (String(post.author) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed to delete this post.' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete post.' });
  }
};

const listTags = async (_req, res) => {
  try {
    const tags = await Post.aggregate([
      { $match: { published: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
      { $limit: 40 },
    ]);

    res.json({
      tags: tags.map((t) => ({ name: t._id, count: t.count })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch tags.' });
  }
};

const myPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate('author', 'name email');
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch your posts.' });
  }
};

module.exports = {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  listTags,
  myPosts,
};
