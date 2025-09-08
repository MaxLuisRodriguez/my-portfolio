import React from 'react';
import { motion } from 'framer-motion';

// TODO: Update this interface with your actual news/blog data structure
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author?: string;
  category?: string;
  readTime?: string;
  slug?: string;
}

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
}

// TODO: Connect to your actual blog/news system (CMS, markdown files, etc.)
const NewsCard: React.FC<NewsCardProps> = ({ article, index = 0 }) => {
  // TODO: Replace with actual navigation to article detail page
  const handleReadMore = () => {
    console.log(`Navigate to article: ${article.slug || article.id}`);
    // Example: navigate(`/news/${article.slug}`)
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={handleReadMore}
    >
      {/* News Card Container - TODO: Style to match brand aesthetic */}
      <div className="bg-gradient-to-br from-black-800/50 to-black-900/80 rounded-2xl overflow-hidden border border-primary-500/20 shadow-xl hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
        
        {/* Article Image - TODO: Replace with actual article featured images */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-900/80 via-transparent to-transparent" />
          
          {/* Category Badge - TODO: Style categories with different colors */}
          {article.category && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black-950 px-3 py-1 rounded-full text-sm font-bold">
              {article.category}
            </div>
          )}
        </div>

        {/* Article Content - TODO: Update layout and styling as needed */}
        <div className="p-6">
          {/* Article Meta - TODO: Add more metadata as needed */}
          <div className="flex items-center justify-between mb-4 text-sm text-primary-300">
            <time dateTime={article.date} className="flex items-center gap-2">
              <span>📅</span>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {article.readTime && (
              <span className="flex items-center gap-2">
                <span>⏱️</span>
                {article.readTime}
              </span>
            )}
          </div>

          {/* Article Title - TODO: Adjust typography as needed */}
          <h3 className="text-xl font-display font-bold text-gold-400 mb-3 group-hover:text-gold-300 transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>

          {/* Article Excerpt - TODO: Adjust length and styling */}
          <p className="text-primary-200 leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Author Info - TODO: Add author photos and bios */}
          <div className="flex items-center justify-between">
            {article.author && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-black-950 font-bold text-sm">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-primary-300">
                  By {article.author}
                </span>
              </div>
            )}

            {/* Read More Button - TODO: Style to match brand */}
            <button className="text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors duration-300 flex items-center gap-2 group-hover:gap-3">
              Read More
              <span className="transition-all duration-300">→</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;
