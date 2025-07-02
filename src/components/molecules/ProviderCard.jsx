import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ProviderCard = ({ provider }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={provider.photo}
            alt={provider.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {provider.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">
                {provider.location.city}, {provider.location.state}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {provider.specialty.slice(0, 2).map((spec, index) => (
                <Badge key={index} variant="primary" size="sm">
                  {spec}
                </Badge>
              ))}
              {provider.specialty.length > 2 && (
                <Badge variant="default" size="sm">
                  +{provider.specialty.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {provider.bio}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <ApperIcon name="Calendar" className="w-4 h-4" />
            <span>{provider.availability.waitTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="MapPin" className="w-4 h-4" />
            <span>{provider.location.city}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link to={`/providers/${provider.Id}`} className="flex-1">
            <Button variant="primary" className="w-full">
              View Profile
            </Button>
          </Link>
          <Button
            variant="outline"
            icon="Phone"
            onClick={() => window.open(`tel:${provider.contactInfo.phone}`)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProviderCard;