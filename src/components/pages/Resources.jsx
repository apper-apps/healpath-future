import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Resources = () => {
  const articles = [
    {
      title: "Understanding Functional Medicine: A Comprehensive Guide",
      excerpt: "Learn about the functional medicine approach to treating chronic conditions and how it differs from conventional medicine.",
      category: "Education",
      readTime: "8 min read",
      link: "#"
    },
    {
      title: "Managing Chronic Pain Naturally",
      excerpt: "Discover evidence-based natural approaches to managing chronic pain, including lifestyle changes and holistic treatments.",
      category: "Pain Management",
      readTime: "12 min read",
      link: "#"
    },
    {
      title: "The Role of Nutrition in Healing",
      excerpt: "Explore how proper nutrition can support your body's natural healing processes and improve chronic health conditions.",
      category: "Nutrition",
      readTime: "10 min read",
      link: "#"
    },
    {
      title: "Mind-Body Connection in Holistic Health",
      excerpt: "Understanding how stress, emotions, and mental health impact physical well-being and recovery.",
      category: "Mental Health",
      readTime: "6 min read",
      link: "#"
    }
  ];

  const tools = [
    {
      icon: "FileText",
      title: "Symptom Tracker",
      description: "Track your symptoms, treatments, and progress over time",
      link: "#"
    },
    {
      icon: "Calculator",
      title: "Treatment Cost Calculator",
      description: "Estimate potential costs for various holistic treatments",
      link: "#"
    },
    {
      icon: "MapPin",
      title: "Provider Locator",
      description: "Find holistic health providers in your area",
      link: "/providers"
    },
    {
      icon: "MessageCircle",
      title: "Support Groups",
      description: "Connect with others on similar healing journeys",
      link: "#"
    }
  ];

  const conditions = [
    {
      name: "Fibromyalgia",
      description: "Resources for managing widespread pain and fatigue",
      icon: "Activity",
      articles: 12
    },
    {
      name: "Chronic Fatigue Syndrome",
      description: "Understanding and treating persistent exhaustion",
      icon: "Battery",
      articles: 8
    },
    {
      name: "Autoimmune Conditions",
      description: "Holistic approaches to autoimmune disorders",
      icon: "Shield",
      articles: 15
    },
    {
      name: "Digestive Issues",
      description: "Natural treatments for gut health and digestion",
      icon: "Zap",
      articles: 20
    },
    {
      name: "Anxiety & Depression",
      description: "Mind-body approaches to mental health",
      icon: "Heart",
      articles: 18
    },
    {
      name: "Hormone Imbalance",
      description: "Natural hormone balancing strategies",
      icon: "Sunrise",
      articles: 10
    }
  ];

  const faqs = [
    {
      question: "What is holistic medicine?",
      answer: "Holistic medicine is an approach that considers the whole person - mind, body, and spirit - in the treatment and prevention of disease. It emphasizes the connection between all aspects of health and uses both conventional and alternative therapies."
    },
    {
      question: "How do I know if a provider is qualified?",
      answer: "All providers in our network are thoroughly vetted. We verify their licenses, credentials, education, and professional references. Look for providers with relevant certifications and positive patient reviews."
    },
    {
      question: "Will insurance cover holistic treatments?",
      answer: "Coverage varies by insurance plan and treatment type. Some holistic treatments like chiropractic care and acupuncture are commonly covered. We recommend checking with your insurance provider and exploring our sponsorship program for additional support."
    },
    {
      question: "How long does holistic treatment take to work?",
      answer: "Treatment timelines vary depending on the condition, individual factors, and treatment approach. Some people notice improvements within weeks, while chronic conditions may require months of consistent treatment. Your provider will discuss realistic expectations during your consultation."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="BookOpen" className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Health Resources & Education
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Empowering your healing journey with evidence-based information, 
              tools, and community support
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Articles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">
              Stay informed with expert insights on holistic health and healing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 card-hover"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <a
                  href={article.link}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Read More
                  <ApperIcon name="ArrowRight" className="w-4 h-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Health Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Health Tools
            </h2>
            <p className="text-xl text-gray-600">
              Practical tools to support your healing journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={tool.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {tool.description}
                </p>
                <Link
                  to={tool.link}
                  className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                >
                  Use Tool
                  <ApperIcon name="ExternalLink" className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Condition-Specific Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Resources by Condition
            </h2>
            <p className="text-xl text-gray-600">
              Find targeted information for your specific health concerns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition, index) => (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name={condition.icon} className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {condition.name}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm">
                      {condition.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {condition.articles} articles
                      </span>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200">
                        Explore →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about holistic health
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our resources to learn more, then connect with qualified providers 
            who can guide you toward better health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/providers">
              <Button variant="accent" size="lg" icon="Search">
                Find Providers
              </Button>
            </Link>
            <Link to="/ai-search">
              <Button variant="outline" size="lg" icon="Sparkles">
                Try AI Search
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Resources;