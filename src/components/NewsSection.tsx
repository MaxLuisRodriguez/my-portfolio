import React from 'react';
import { motion } from 'framer-motion';
import NewsCard from './NewsCard';

// TODO: Update this interface to match your news data structure
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

interface NewsSectionProps {
  articles: NewsArticle[];
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  maxArticles?: number;
}

// TODO: Connect to your actual news/blog data source
const NewsSection: React.FC<NewsSectionProps> = ({ 
  articles, 
  title = "Latest News & Updates",
  subtitle = "Stay updated with the latest from WAW Energy",
  showAll = false,
  maxArticles = 3
}) => {
  // TODO: Implement "Load More" or pagination functionality
  const displayedArticles = showAll ? articles : articles.slice(0, maxArticles);

  return (
    <section className="py-20 bg-gradient-to-b from-black-900 to-black-950">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Section Header - TODO: Update copy and styling as needed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-gold-500 mb-4">
            {title}
          </h2>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Articles Grid - TODO: Adjust grid layout based on design preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article, index) => (
            <NewsCard 
              key={article.id} 
              article={article} 
              index={index} 
            />
          ))}
        </div>

        {/* Show More Button - TODO: Implement actual "load more" functionality */}
        {!showAll && articles.length > maxArticles && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-black-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30">
              View All Articles
            </button>
          </motion.div>
        )}

        {/* Empty State - TODO: Style empty state for when no articles exist */}
        {articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-6">📰</div>
            <h3 className="text-2xl font-display font-bold text-gold-400 mb-4">
              No Articles Yet
            </h3>
            <p className="text-primary-200 max-w-md mx-auto">
              Stay tuned for exciting news and updates from WAW Energy!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
