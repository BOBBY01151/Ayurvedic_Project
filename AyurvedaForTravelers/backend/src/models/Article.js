const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Article slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  content: {
    type: String,
    required: [true, 'Article content is required'],
    trim: true
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  type: {
    type: String,
    required: [true, 'Article type is required'],
    enum: ['blog', 'guide', 'faq', 'testimonial', 'news'],
    default: 'blog'
  },
  category: {
    type: String,
    required: [true, 'Article category is required'],
    enum: [
      'Ayurveda Basics',
      'Treatments',
      'Travel Tips',
      'Sri Lanka Guide',
      'Wellness',
      'Lifestyle',
      'Testimonials',
      'News',
      'FAQ'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  featuredImage: {
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    caption: String
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    caption: String,
    position: {
      type: Number,
      default: 0
    }
  }],
  meta: {
    description: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    ogImage: String,
    canonicalUrl: String
  },
  seo: {
    focusKeyword: String,
    titleTag: String,
    metaDescription: String,
    socialTitle: String,
    socialDescription: String
  },
  language: {
    type: String,
    enum: ['en', 'de', 'ru'],
    default: 'en'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  scheduledFor: {
    type: Date
  },
  readingTime: {
    type: Number, // in minutes
    default: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  shares: {
    type: Number,
    default: 0,
    min: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    approved: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  relatedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  template: {
    type: String,
    enum: ['default', 'wide', 'narrow', 'sidebar'],
    default: 'default'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
articleSchema.index({ slug: 1 });
articleSchema.index({ type: 1, status: 1 });
articleSchema.index({ category: 1, status: 1 });
articleSchema.index({ author: 1 });
articleSchema.index({ publishedAt: -1 });
articleSchema.index({ language: 1, status: 1 });
articleSchema.index({ tags: 1 });
articleSchema.index({ isFeatured: 1, status: 1 });
articleSchema.index({ views: -1 });

// Text search index
articleSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
  tags: 'text'
});

// Virtual for reading time calculation
articleSchema.virtual('calculatedReadingTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Virtual for comment count
articleSchema.virtual('commentCount').get(function() {
  return this.comments.filter(comment => comment.approved).length;
});

// Virtual for URL
articleSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`;
});

// Pre-save middleware to generate slug if not provided
articleSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  // Calculate reading time if not set
  if (!this.readingTime && this.content) {
    this.readingTime = this.calculatedReadingTime;
  }
  
  // Set published date when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Method to increment views
articleSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to add comment
articleSchema.methods.addComment = function(commentData) {
  this.comments.push({
    ...commentData,
    createdAt: new Date()
  });
  return this.save();
};

// Static method to get published articles
articleSchema.statics.getPublished = function() {
  return this.find({ 
    status: 'published',
    $or: [
      { publishedAt: { $lte: new Date() } },
      { scheduledFor: { $lte: new Date() } }
    ]
  }).sort({ publishedAt: -1 });
};

// Static method to search articles
articleSchema.statics.search = function(query, options = {}) {
  const searchOptions = {
    status: 'published',
    ...options
  };
  
  if (query) {
    searchOptions.$text = { $search: query };
  }
  
  return this.find(searchOptions, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' }, publishedAt: -1 });
};

module.exports = mongoose.model('Article', articleSchema);
