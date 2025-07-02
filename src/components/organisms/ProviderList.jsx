import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProviderCard from "@/components/molecules/ProviderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import providerService from "@/services/api/providerService";

const ProviderList = ({ filters = {}, searchTerm = "" }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProviders();
  }, [filters, searchTerm]);

  const loadProviders = async () => {
    try {
      setLoading(true);
      setError("");
      
      const searchFilters = {
        ...filters,
        search: searchTerm
      };
      
      const data = await providerService.getAll(searchFilters);
      setProviders(data);
    } catch (err) {
      setError("Failed to load providers. Please try again.");
      console.error("Error loading providers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadProviders();
  };

  if (loading) {
    return <Loading type="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

  if (providers.length === 0) {
    return (
      <Empty
        title="No providers found"
        description="We couldn't find any providers matching your criteria. Try adjusting your filters or search terms."
        actionText="Clear Filters"
        onAction={() => window.location.reload()}
        icon="UserX"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {providers.length} Provider{providers.length !== 1 ? 's' : ''} Found
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-6"
      >
        {providers.map((provider, index) => (
          <motion.div
            key={provider.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProviderCard provider={provider} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProviderList;