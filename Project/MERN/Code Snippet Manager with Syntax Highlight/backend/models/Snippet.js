const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'c',
  'cpp',
  'csharp',
  'go',
  'rust',
  'php',
  'ruby',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'yaml',
  'markdown',
  'plaintext',
];

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 160,
    },
    code: {
      type: String,
      required: [true, 'Code is required'],
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: LANGUAGES,
      default: 'javascript',
      index: true,
    },
    description: {
      type: String,
      maxlength: 500,
      default: '',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
      index: true,
    },
    shareId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

snippetSchema.index({
  title: 'text',
  code: 'text',
  description: 'text',
  tags: 'text',
  language: 'text',
});

snippetSchema.pre('validate', function normalize(next) {
  this.tags = (this.tags || [])
    .map((t) => String(t).trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 12);

  // Keep a stable short id once public so re-sharing reuses the same link
  if (this.isPublic && !this.shareId) {
    this.shareId = nanoid(8);
  }

  next();
});

module.exports = mongoose.model('Snippet', snippetSchema);
module.exports.LANGUAGES = LANGUAGES;
