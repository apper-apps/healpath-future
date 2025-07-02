import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate(`/providers?search=${encodeURIComponent(term)}`);
  };

  const stats = [
    { label: "Verified Providers", value: "500+" },
    { label: "Patients Helped", value: "10K+" },
    { label: "Treatments Sponsored", value: "$2M+" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              Find Your Path to{" "}
              <span className="gradient-text">Holistic Healing</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with verified holistic health providers and access financial 
              assistance for your treatment journey. Your path to wellness starts here.
            </p>

            <div className="space-y-6 mb-8">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by condition, provider, or treatment..."
                className="max-w-2xl"
              />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="accent"
                  icon="Sparkles"
                  onClick={() => navigate("/ai-search")}
                  className="sm:w-auto w-full"
                >
                  Try AI-Powered Search
                </Button>
                <Button
                  variant="outline"
                  icon="Heart"
                  onClick={() => navigate("/sponsorship")}
                  className="sm:w-auto w-full"
                >
                  Learn About Sponsorship
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl lg:text-3xl font-display font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Heart", label: "Functional Medicine", color: "primary" },
                  { icon: "Activity", label: "Chiropractic Care", color: "secondary" },
                  { icon: "Leaf", label: "Naturopathic Medicine", color: "accent" },
                  { icon: "Zap", label: "Acupuncture", color: "success" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm text-center"
                  >
                    <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <ApperIcon name={item.icon} className={`w-6 h-6 text-${item.color}-600`} />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;