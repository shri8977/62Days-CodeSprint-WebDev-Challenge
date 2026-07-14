const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Markdown content is required'],
    },
    excerpt: {
      type: String,
      maxlength: 280,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', content: 'text', excerpt: 'text', tags: 'text' });

postSchema.pre('validate', function makeSlug(next) {
  if (!this.title) return next();

  const base = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  if (!this.slug || this.isModified('title')) {
    this.slug = `${base}-${Date.now().toString(36)}`;
  }

  if (!this.excerpt) {
    this.excerpt = this.content.replace(/[#>*_`~\-\[\]\(\)!]/g, '').slice(0, 160);
  }

  this.tags = (this.tags || [])
    .map((t) => String(t).trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 12);

  next();
});

module.exports = mongoose.model('Post', postSchema);
