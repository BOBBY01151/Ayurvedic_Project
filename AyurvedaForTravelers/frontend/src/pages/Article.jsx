import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Tag,
  BookOpen,
  Share2,
  Heart
} from 'lucide-react'
import Footer from '../components/Footer'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'

// Sample article data (in a real app, this would come from an API)
const sampleArticles = {
  1: {
    id: 1,
    title: "The Ancient Wisdom of Ayurveda: A Complete Guide",
    content: `
      <p class="text-lg text-[var(--ayurveda-green)]/80 leading-relaxed mb-6">
        Ayurveda, often called the "science of life," is one of the world's oldest holistic healing systems. 
        Developed more than 3,000 years ago in India, this ancient practice emphasizes the balance between 
        mind, body, and spirit to achieve optimal health and wellness.
      </p>
      
      <h2 class="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 mt-8">The Three Doshas</h2>
      <p class="text-[var(--ayurveda-green)]/70 leading-relaxed mb-4">
        At the heart of Ayurveda lies the concept of three fundamental energies or doshas: Vata, Pitta, and Kapha. 
        Each person has a unique combination of these doshas, which determines their physical and mental characteristics.
      </p>
      
      <div class="grid md:grid-cols-3 gap-6 my-8">
        <div class="bg-gradient-to-br from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/10 p-6 rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Vata</h3>
          <p class="text-sm text-[var(--ayurveda-green)]/70">Associated with air and space, governs movement and communication.</p>
        </div>
        <div class="bg-gradient-to-br from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/10 p-6 rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Pitta</h3>
          <p class="text-sm text-[var(--ayurveda-green)]/70">Associated with fire and water, governs digestion and metabolism.</p>
        </div>
        <div class="bg-gradient-to-br from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/10 p-6 rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Kapha</h3>
          <p class="text-sm text-[var(--ayurveda-green)]/70">Associated with earth and water, governs structure and stability.</p>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 mt-8">The Five Elements</h2>
      <p class="text-[var(--ayurveda-green)]/70 leading-relaxed mb-4">
        Ayurveda is based on the five elements: ether (space), air, fire, water, and earth. These elements 
        combine to form the three doshas and are present in everything in the universe, including our bodies.
      </p>
      
      <h2 class="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 mt-8">Practical Applications</h2>
      <p class="text-[var(--ayurveda-green)]/70 leading-relaxed mb-4">
        Modern applications of Ayurveda include personalized nutrition plans, herbal remedies, yoga and 
        meditation practices, and lifestyle modifications that align with your unique constitution.
      </p>
      
      <p class="text-[var(--ayurveda-green)]/70 leading-relaxed mb-4">
        By understanding your dosha and making conscious choices about diet, exercise, and daily routines, 
        you can maintain balance and promote natural healing throughout your life.
      </p>
    `,
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Wellness",
    tags: ["Ayurveda", "Wellness", "Ancient Wisdom", "Doshas"],
    image: "/images/ayurveda-herbs.jpg",
    excerpt: "Discover the 5000-year-old healing system that balances mind, body, and spirit through natural treatments and lifestyle practices."
  },
  2: {
    id: 2,
    title: "Panchakarma: The Ultimate Detox Experience",
    content: `
      <p class="text-lg text-[var(--ayurveda-green)]/80 leading-relaxed mb-6">
        Panchakarma, meaning "five actions" in Sanskrit, is Ayurveda's most comprehensive detoxification and 
        rejuvenation program. This ancient therapy system is designed to eliminate toxins from the body and 
        restore optimal health through five specialized treatments.
      </p>
      
      <h2 class="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 mt-8">The Five Therapies</h2>
      
      <div class="space-y-6 my-8">
        <div class="bg-gradient-to-r from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/10 p-6 rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Vamana (Therapeutic Vomiting)</h3>
          <p class="text-[var(--ayurveda-green)]/70">Eliminates excess Kapha from the upper respiratory tract and stomach.</p>
        </div>
        
        <div class="bg-gradient-to-r from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/10 p-6 rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Virechana (Purgation)</h3>
          <p class="text-[var(--ayurveda-green)]/70">Removes excess Pitta from the small intestine and liver.</p>
        </div>
        
        <div class="bg-gradient-to-r from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/10 p-6 rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Basti (Enema Therapy)</h3>
          <p class="text-[var(--ayurveda-green)]/70">Cleanses the colon and balances Vata dosha.</p>
        </div>
        
        <div class="bg-gradient-to-r from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/10 p-6 rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Nasya (Nasal Administration)</h3>
          <p class="text-[var(--ayurveda-green)]/70">Clears toxins from the head and neck region.</p>
        </div>
        
        <div class="bg-gradient-to-r from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/10 p-6 rounded-xl">
          <h3 class="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Raktamokshana (Blood Letting)</h3>
          <p class="text-[var(--ayurveda-green)]/70">Purifies the blood and removes toxins from the circulatory system.</p>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 mt-8">Benefits of Panchakarma</h2>
      <p class="text-[var(--ayurveda-green)]/70 leading-relaxed mb-4">
        Regular Panchakarma treatments can help improve digestion, boost immunity, reduce stress, 
        enhance mental clarity, and promote overall well-being. It's particularly beneficial for 
        those dealing with chronic health conditions or seeking to prevent disease.
      </p>
    `,
    author: "Dr. Rajesh Kumar",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Treatments",
    tags: ["Panchakarma", "Detox", "Cleansing", "Therapy"],
    image: "/images/panchakarma.jpg",
    excerpt: "Learn about the five cleansing therapies that form the cornerstone of Ayurvedic healing and rejuvenation."
  }
}

export default function Article() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // In a real app, fetch article by ID from API
    const foundArticle = sampleArticles[id]
    setArticle(foundArticle)
  }, [id])

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--ayurveda-cream)] to-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-[var(--ayurveda-green)]/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-2">Article Not Found</h1>
          <p className="text-[var(--ayurveda-green)]/70 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--ayurveda-cream)] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
              <span className="bg-white/20 px-2 py-1 rounded-full">{article.category}</span>
              <span>•</span>
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="text-white hover:bg-white/20"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-400' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 rounded-2xl"
        >
          {/* Article Image Placeholder */}
          <div className="h-64 bg-gradient-to-br from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] rounded-xl mb-8 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-50" />
          </div>
          
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-[var(--ayurveda-green)]/20">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-[var(--ayurveda-green)]" />
              <span className="text-sm font-medium text-[var(--ayurveda-green)]">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[var(--ayurveda-green)]/10 text-[var(--ayurveda-green)] px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.values(sampleArticles)
              .filter(a => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Card key={relatedArticle.id} className="glass-card border-[var(--ayurveda-green)]/20 hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white opacity-50" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-[var(--ayurveda-green)]/70 mb-3">
                      <span className="bg-[var(--ayurveda-green)]/10 px-2 py-1 rounded-full">{relatedArticle.category}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{relatedArticle.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--ayurveda-green)] mb-3 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-[var(--ayurveda-green)]/70 mb-4 line-clamp-3">
                      {relatedArticle.excerpt}
                    </p>
                    <Link to={`/blog/${relatedArticle.id}`}>
                      <Button size="sm" className="bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
