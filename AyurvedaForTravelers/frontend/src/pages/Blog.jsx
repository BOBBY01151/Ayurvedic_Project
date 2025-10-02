import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Search,
  Filter,
  Tag
} from 'lucide-react'
import Footer from '../components/Footer'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

// Sample blog posts data
const samplePosts = [
  {
    id: 1,
    title: "The Ancient Wisdom of Ayurveda: A Complete Guide",
    excerpt: "Discover the 5000-year-old healing system that balances mind, body, and spirit through natural treatments and lifestyle practices.",
    content: "Full content here...",
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Wellness",
    tags: ["Ayurveda", "Wellness", "Ancient Wisdom"],
    image: "/images/ayurveda-herbs.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Panchakarma: The Ultimate Detox Experience",
    excerpt: "Learn about the five cleansing therapies that form the cornerstone of Ayurvedic healing and rejuvenation.",
    content: "Full content here...",
    author: "Dr. Rajesh Kumar",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Treatments",
    tags: ["Panchakarma", "Detox", "Cleansing"],
    image: "/images/panchakarma.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Seasonal Ayurvedic Routines for Optimal Health",
    excerpt: "Adapt your daily routine according to Ayurvedic principles to maintain balance throughout the changing seasons.",
    content: "Full content here...",
    author: "Dr. Anjali Patel",
    date: "2024-01-05",
    readTime: "5 min read",
    category: "Lifestyle",
    tags: ["Routine", "Seasons", "Balance"],
    image: "/images/seasonal-routine.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Herbal Remedies for Common Travel Ailments",
    excerpt: "Natural Ayurvedic solutions for jet lag, digestive issues, and stress that travelers commonly experience.",
    content: "Full content here...",
    author: "Dr. Michael Chen",
    date: "2024-01-01",
    readTime: "7 min read",
    category: "Travel Health",
    tags: ["Travel", "Herbs", "Natural Remedies"],
    image: "/images/travel-herbs.jpg",
    featured: false
  }
]

const categories = ["All", "Wellness", "Treatments", "Lifestyle", "Travel Health"]
const tags = ["Ayurveda", "Wellness", "Panchakarma", "Herbs", "Travel", "Detox", "Routine", "Natural Remedies"]

export default function Blog() {
  const { t } = useTranslation()
  const [posts, setPosts] = useState(samplePosts)
  const [filteredPosts, setFilteredPosts] = useState(samplePosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    let filtered = posts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, selectedTag, posts])

  const featuredPost = posts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--ayurveda-cream)] to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <BookOpen className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ayurvedic Wisdom Blog
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover ancient healing traditions, wellness tips, and natural remedies 
              for your journey to optimal health and well-being.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 rounded-2xl mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--ayurveda-green)]/50 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[var(--ayurveda-green)]/30 focus:border-[var(--ayurveda-green)]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? "bg-[var(--ayurveda-green)] text-white"
                      : "border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-green)] hover:text-white"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Filter className="w-4 h-4 text-[var(--ayurveda-green)] mt-1" />
            {tags.map((tag) => (
              <Button
                key={tag}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`${
                  selectedTag === tag
                    ? "bg-[var(--ayurveda-green)] text-white"
                    : "text-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-green)] hover:text-white"
                }`}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'All' && !searchTerm && !selectedTag && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-6">Featured Article</h2>
            <Card className="overflow-hidden glass-card border-[var(--ayurveda-green)]/20">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-white opacity-50" />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 text-sm text-[var(--ayurveda-green)]/70 mb-3">
                    <span className="bg-[var(--ayurveda-green)]/10 px-2 py-1 rounded-full">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-[var(--ayurveda-green)]/70 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-[var(--ayurveda-green)]/70" />
                      <span className="text-sm text-[var(--ayurveda-green)]/70">{featuredPost.author}</span>
                      <Calendar className="w-4 h-4 text-[var(--ayurveda-green)]/70" />
                      <span className="text-sm text-[var(--ayurveda-green)]/70">{featuredPost.date}</span>
                    </div>
                    <Link to={`/blog/${featuredPost.id}`}>
                      <Button className="bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-6">
            {selectedCategory !== 'All' || searchTerm || selectedTag ? 'Search Results' : 'Latest Articles'}
          </h2>
          
          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-[var(--ayurveda-green)]/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-2">No articles found</h3>
              <p className="text-[var(--ayurveda-green)]/70">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden glass-card border-[var(--ayurveda-green)]/20 hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white opacity-50" />
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 text-sm text-[var(--ayurveda-green)]/70 mb-3">
                        <span className="bg-[var(--ayurveda-green)]/10 px-2 py-1 rounded-full">{post.category}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--ayurveda-green)] mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[var(--ayurveda-green)]/70 mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-[var(--ayurveda-green)]/70">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <Link to={`/blog/${post.id}`}>
                          <Button size="sm" className="bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white">
                            Read
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
