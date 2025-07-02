import { motion } from "framer-motion";
import AISearchInterface from "@/components/organisms/AISearchInterface";
import ApperIcon from "@/components/ApperIcon";

const AISearch = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Sparkles" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-900">
              AI-Powered Provider Search
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Tell us about your symptoms and health goals, and our AI will help you find 
            the most suitable holistic health providers for your specific needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: "MessageCircle",
                title: "Natural Conversation",
                description: "Chat naturally about your symptoms and concerns"
              },
              {
                icon: "Brain",
                title: "Smart Matching",
                description: "AI analyzes your needs to find the best providers"
              },
              {
                icon: "Target",
                title: "Personalized Results",
                description: "Get recommendations tailored specifically to you"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Search Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AISearchInterface />
        </motion.div>
      </div>
    </div>
  );
};

export default AISearch;