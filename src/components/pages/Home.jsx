import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "@/components/organisms/HeroSection";
import ProviderCard from "@/components/molecules/ProviderCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import providerService from "@/services/api/providerService";
import Loading from "@/components/ui/Loading";

const Home = () => {
  const [featuredProviders, setFeaturedProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProviders();
  }, []);

  const loadFeaturedProviders = async () => {
    try {
      setLoading(true);
      const providers = await providerService.getFeatured();
      setFeaturedProviders(providers.slice(0, 3));
    } catch (error) {
      console.error("Error loading featured providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: "Search",
      title: "Find Verified Providers",
      description: "Browse our directory of thoroughly vetted holistic health practitioners."
    },
    {
      icon: "Sparkles",
      title: "AI-Powered Matching",
      description: "Get personalized provider recommendations based on your specific needs."
    },
    {
      icon: "Heart",
      title: "Financial Assistance",
      description: "Apply for sponsorship to help cover the cost of your treatment."
    },
    {
      icon: "Users",
      title: "Community Support",
      description: "Connect with others on similar healing journeys and share experiences."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      condition: "Chronic Fibromyalgia",
      quote: "HealPath connected me with Dr. Chen, who helped me find relief after years of pain. The sponsorship program made it possible for me to afford treatment.",
      rating: 5
    },
    {
      name: "Michael R.",
      condition: "Digestive Issues",
      quote: "The AI search was incredible - it understood my symptoms and matched me with the perfect naturopathic doctor. I'm feeling better than I have in years.",
      rating: 5
    },
    {
      name: "Lisa T.",
      condition: "Chronic Fatigue",
      quote: "I was skeptical about holistic medicine, but HealPath's verified providers gave me confidence. The functional medicine approach changed my life.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              How HealPath Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make it easy to find and connect with the right holistic health provider for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Featured Providers
            </h2>
            <p className="text-xl text-gray-600">
              Meet some of our top-rated holistic health practitioners
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Loading key={i} type="card" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {featuredProviders.map((provider, index) => (
                <motion.div
                  key={provider.Id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProviderCard provider={provider} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/providers">
              <Button variant="primary" icon="ArrowRight">
                View All Providers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real people, real healing journeys
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <ApperIcon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.condition}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Ready to Start Your Healing Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Get connected with the right provider and explore financial assistance options
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/providers">
                <Button variant="accent" size="lg" icon="Search" className="w-full sm:w-auto">
                  Find Providers
                </Button>
              </Link>
              <Link to="/apply-patient">
                <Button 
                  variant="outline" 
                  size="lg" 
                  icon="Heart"
                  className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Apply for Sponsorship
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;