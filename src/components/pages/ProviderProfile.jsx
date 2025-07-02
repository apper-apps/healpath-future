import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Providers from "@/components/pages/Providers";
import providerService from "@/services/api/providerService";

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProvider();
  }, [id]);

  const loadProvider = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await providerService.getById(id);
      
      if (!data) {
        setError("Provider not found");
        return;
      }
      
      setProvider(data);
    } catch (err) {
      setError("Failed to load provider profile");
      console.error("Error loading provider:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (method, value) => {
    switch (method) {
      case "phone":
        window.open(`tel:${value}`);
        break;
      case "email":
        window.open(`mailto:${value}`);
        break;
      case "website":
        window.open(value, "_blank");
        break;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadProvider} />;
  }

  if (!provider) {
    return <Error message="Provider not found" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/providers"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            Back to Providers
          </Link>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 px-8 py-12"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
<img
                src={provider.photo}
                alt={provider.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              
              <div className="flex-1">
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {provider.name}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.specialty.map((spec, index) => (
                    <Badge key={index} variant="primary">
                      {spec}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{provider.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
<ApperIcon name="MapPin" className="w-5 h-5" />
                    <span>{provider.location.city}, {provider.location.state}</span>
                  </div>
                  <div className="flex items-center gap-1">
<ApperIcon name="Calendar" className="w-5 h-5" />
                    <span>{provider.availability.waitTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button
                  variant="accent"
icon="Phone"
                  onClick={() => handleContact("phone", provider.contactInfo.phone)}
                >
                  Call Now
                </Button>
                <Link to="/apply-patient">
                  <Button variant="primary" icon="Heart" className="w-full">
                    Apply for Sponsorship
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="p-8 space-y-8">
            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
<h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                About {provider.name.split(" ")[1] || provider.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {provider.bio}
              </p>
            </motion.section>

            {/* Credentials */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Credentials & Certifications
                </h3>
                <ul className="space-y-2">
                  {provider.credentials.map((credential, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ApperIcon name="CheckCircle" className="w-5 h-5 text-success" />
                      <span className="text-gray-700">{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Services Offered
                </h3>
                <ul className="space-y-2">
                  {provider.services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ApperIcon name="Plus" className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Insurance & Location */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Insurance Accepted
                </h3>
                <div className="flex flex-wrap gap-2">
                  {provider.insurance.map((insurance, index) => (
                    <Badge key={index} variant="secondary">
                      {insurance}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Location & Contact
</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <ApperIcon name="MapPin" className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{provider.location.address}</p>
                      <p className="text-gray-700">
                        {provider.location.city}, {provider.location.state} {provider.location.zipCode}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Phone" className="w-5 h-5 text-gray-400" />
                    <button
                      onClick={() => handleContact("phone", provider.contactInfo.phone)}
                      className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      {provider.contactInfo.phone}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Mail" className="w-5 h-5 text-gray-400" />
                    <button
                      onClick={() => handleContact("email", provider.contactInfo.email)}
                      className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      {provider.contactInfo.email}
                    </button>
                  </div>
                  
                  {provider.contactInfo.website && (
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Globe" className="w-5 h-5 text-gray-400" />
                      <button
                        onClick={() => handleContact("website", provider.contactInfo.website)}
                        className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                      >
                        Visit Website
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Availability */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Availability
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Calendar" className="w-5 h-5 text-primary-600" />
<span className="text-gray-700">
                    Next available: {provider.availability.nextAvailable ? new Date(provider.availability.nextAvailable).toLocaleDateString() : 'Not specified'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Clock" className="w-5 h-5 text-primary-600" />
<span className="text-gray-700">
                    Typical wait: {provider.availability.waitTime}
                  </span>
                </div>
              </div>
            </motion.section>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100"
            >
              <Button
                variant="accent"
icon="Phone"
                onClick={() => handleContact("phone", provider.contactInfo.phone)}
                className="flex-1"
              >
                Call {provider.name.split(" ")[1] || provider.name}
              </Button>
              <Button
                variant="outline"
icon="Mail"
                onClick={() => handleContact("email", provider.contactInfo.email)}
                className="flex-1"
              >
                Send Email
              </Button>
              <Link to="/apply-patient" className="flex-1">
                <Button variant="primary" icon="Heart" className="w-full">
                  Apply for Sponsorship
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;