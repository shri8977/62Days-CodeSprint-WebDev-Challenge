const mongoose = require('mongoose');
const Snippet = require('../models/Snippet');
const { LANGUAGES } = require('../models/Snippet');

const parseTags = (tags) => {
  if (Array.isArray(tags)) return tags;
  return String(tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
};

const listMine = async (req, res) => {
  try {
    const { q, language, tag, page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(50, Math.max(1, Number(limit) || 20));

    const filter = { owner: req.user._id };

    if (language) {
      filter.language = String(language).toLowerCase().trim();
    }

    if (tag) {
      filter.tags = String(tag).toLowerCase().trim();
    }

    if (q && String(q).trim()) {
      filter.$text = { $search: String(q).trim() };
    }

    const query = Snippet.find(filter).populate('owner', 'name email');

    if (q && String(q).trim()) {
      query
        .select({ score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } });
    } else {
      query.sort({ updatedAt: -1 });
    }

    const [snippets, total] = await Promise.all([
      query.skip((pageNum - 1) * limitNum).limit(limitNum),
      Snippet.countDocuments(filter),
    ]);

    res.json({
      snippets,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Failed to fetch snippets.' });
  }
};

const getSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate(
      'owner',
      'name email'
    );

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found.' });
    }

    const isOwner = String(snippet.owner._id) === String(req.user._id);
    if (!isOwner && !snippet.isPublic) {
      return res.status(403).json({ message: 'This snippet is private.' });
    }

    res.json({ snippet });
  } catch (_error) {
    res.status(404).json({ message: 'Snippet not found.' });
  }
};

const getShared = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      shareId: req.params.shareId,
      isPublic: true,
    }).populate('owner', 'name');

    if (!snippet) {
      return res
        .status(404)
        .json({ message: 'Shared snippet not found or is private.' });
    }

    res.json({ snippet });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Failed to load shared snippet.' });
  }
};

const createSnippet = async (req, res) => {
  try {
    const { title, code, language, description, tags, isPublic } = req.body;

    if (!title || !code) {
      return res
        .status(400)
        .json({ message: 'Title and code are required.' });
    }

    const lang = String(language || 'javascript').toLowerCase();
    if (!LANGUAGES.includes(lang)) {
      return res.status(400).json({ message: 'Unsupported language.' });
    }

    const snippet = await Snippet.create({
      title,
      code,
      language: lang,
      description: description || '',
      tags: parseTags(tags),
      isPublic: Boolean(isPublic),
      owner: req.user._id,
    });

    await snippet.populate('owner', 'name email');
    res.status(201).json({ snippet });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Failed to create snippet.' });
  }
};

const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found.' });
    }

    if (String(snippet.owner) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'Not allowed to edit this snippet.' });
    }

    const { title, code, language, description, tags, isPublic } = req.body;

    if (title !== undefined) snippet.title = title;
    if (code !== undefined) snippet.code = code;
    if (description !== undefined) snippet.description = description;
    if (isPublic !== undefined) snippet.isPublic = Boolean(isPublic);

    if (language !== undefined) {
      const lang = String(language).toLowerCase();
      if (!LANGUAGES.includes(lang)) {
        return res.status(400).json({ message: 'Unsupported language.' });
      }
      snippet.language = lang;
    }

    if (tags !== undefined) {
      snippet.tags = parseTags(tags);
    }

    await snippet.save();
    await snippet.populate('owner', 'name email');
    res.json({ snippet });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Failed to update snippet.' });
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found.' });
    }

    if (String(snippet.owner) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'Not allowed to delete this snippet.' });
    }

    await snippet.deleteOne();
    res.json({ message: 'Snippet deleted.' });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Failed to delete snippet.' });
  }
};

const listMeta = async (_req, res) => {
  res.json({ languages: LANGUAGES });
};

const listTags = async (req, res) => {
  try {
    const tags = await Snippet.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(req.user._id) } },
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

module.exports = {
  listMine,
  getSnippet,
  getShared,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  listMeta,
  listTags,
};
