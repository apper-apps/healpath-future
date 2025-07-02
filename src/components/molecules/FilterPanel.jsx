import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FilterPanel = ({ onFiltersChange, isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    specialty: [],
    location: "",
    insurance: [],
    minRating: 0
  });

  const specialties = [
    "Functional Medicine",
    "Chiropractic Care",
    "Health Coaching",
    "Acupuncture",
    "Naturopathic Medicine",
    "Massage Therapy"
  ];

  const insuranceOptions = [
    "Blue Cross Blue Shield",
    "Aetna",
    "United Healthcare",
    "Cigna",
    "Humana",
    "Kaiser Permanente"
  ];

  const handleSpecialtyChange = (specialty) => {
    const newSpecialties = filters.specialty.includes(specialty)
      ? filters.specialty.filter(s => s !== specialty)
      : [...filters.specialty, specialty];
    
    const newFilters = { ...filters, specialty: newSpecialties };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleInsuranceChange = (insurance) => {
    const newInsurance = filters.insurance.includes(insurance)
      ? filters.insurance.filter(i => i !== insurance)
      : [...filters.insurance, insurance];
    
    const newFilters = { ...filters, insurance: newInsurance };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleLocationChange = (e) => {
    const newFilters = { ...filters, location: e.target.value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newFilters = { ...filters, minRating: rating };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      specialty: [],
      location: "",
      insurance: [],
      minRating: 0
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          icon={isOpen ? "X" : "Filter"}
          onClick={onToggle}
          className="w-full"
        >
          {isOpen ? "Close Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filter panel */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        className={`lg:opacity-100 lg:h-auto overflow-hidden ${!isOpen ? 'lg:block hidden' : 'block'}`}
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <Button variant="ghost" onClick={clearFilters} className="text-sm">
              Clear All
            </Button>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="City or State"
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Specialty
            </label>
            <div className="space-y-2">
              {specialties.map((specialty) => (
                <label key={specialty} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.specialty.includes(specialty)}
                    onChange={() => handleSpecialtyChange(specialty)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Insurance Accepted
            </label>
            <div className="space-y-2">
              {insuranceOptions.map((insurance) => (
                <label key={insurance} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.insurance.includes(insurance)}
                    onChange={() => handleInsuranceChange(insurance)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{insurance}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Minimum Rating
            </label>
            <div className="space-y-2">
              {[4, 4.5, 4.8].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <div className="ml-2 flex items-center">
                    <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-700">{rating}+ stars</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FilterPanel;