import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const PatientApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Health Information
    primaryCondition: "",
    symptoms: "",
    currentTreatments: "",
    previousTreatments: "",
    medications: "",
    preferredProviders: "",
    
    // Financial Information
    householdIncome: "",
    householdSize: "",
    employmentStatus: "",
    insuranceStatus: "",
    
    // Additional Information
    treatmentGoals: "",
    additionalInfo: "",
    agreeToTerms: false
  });

  const totalSteps = 4;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.primaryCondition && formData.symptoms;
      case 3:
        return formData.householdIncome && formData.householdSize;
      case 4:
        return formData.treatmentGoals && formData.agreeToTerms;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please complete all required fields");
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Application submitted successfully! We'll review your application and contact you within 5-7 business days.");
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        primaryCondition: "",
        symptoms: "",
        currentTreatments: "",
        previousTreatments: "",
        medications: "",
        preferredProviders: "",
        householdIncome: "",
        householdSize: "",
        employmentStatus: "",
        insuranceStatus: "",
        treatmentGoals: "",
        additionalInfo: "",
        agreeToTerms: false
      });
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name *"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
                <Input
                  label="Last Name *"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
                <Input
                  label="Email Address *"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
                <Input
                  label="Phone Number *"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Address</h4>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your street address"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                  />
                  <Input
                    label="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State"
                  />
                  <Input
                    label="ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Health Information
              </h3>
              <div className="space-y-6">
                <Input
                  label="Primary Health Condition *"
                  value={formData.primaryCondition}
                  onChange={(e) => handleInputChange("primaryCondition", e.target.value)}
                  placeholder="e.g., Chronic pain, Fibromyalgia, Digestive issues"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Symptoms *
                  </label>
                  <textarea
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange("symptoms", e.target.value)}
                    placeholder="Describe your current symptoms and how they affect your daily life"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Treatments
                  </label>
                  <textarea
                    value={formData.currentTreatments}
                    onChange={(e) => handleInputChange("currentTreatments", e.target.value)}
                    placeholder="List any treatments you're currently receiving"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Treatments Tried
                  </label>
                  <textarea
                    value={formData.previousTreatments}
                    onChange={(e) => handleInputChange("previousTreatments", e.target.value)}
                    placeholder="What treatments have you tried in the past?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={3}
                  />
                </div>

                <Input
                  label="Current Medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  placeholder="List current medications (optional)"
                />

                <Input
                  label="Preferred Providers"
                  value={formData.preferredProviders}
                  onChange={(e) => handleInputChange("preferredProviders", e.target.value)}
                  placeholder="Any specific providers you'd like to work with? (optional)"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Financial Information
              </h3>
              <p className="text-gray-600 mb-6">
                This information helps us determine your eligibility and coverage level. 
                All information is kept strictly confidential.
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Household Income *
                    </label>
                    <select
                      value={formData.householdIncome}
                      onChange={(e) => handleInputChange("householdIncome", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    >
                      <option value="">Select income range</option>
                      <option value="under-25k">Under $25,000</option>
                      <option value="25k-40k">$25,000 - $40,000</option>
                      <option value="40k-60k">$40,000 - $60,000</option>
                      <option value="60k-80k">$60,000 - $80,000</option>
                      <option value="80k-100k">$80,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                    </select>
                  </div>

                  <Input
                    label="Household Size *"
                    type="number"
                    value={formData.householdSize}
                    onChange={(e) => handleInputChange("householdSize", e.target.value)}
                    placeholder="Number of people in household"
                    min="1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Status
                    </label>
                    <select
                      value={formData.employmentStatus}
                      onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    >
                      <option value="">Select status</option>
                      <option value="employed-full">Employed Full-time</option>
                      <option value="employed-part">Employed Part-time</option>
                      <option value="self-employed">Self-employed</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="disabled">Disabled</option>
                      <option value="retired">Retired</option>
                      <option value="student">Student</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Status
                    </label>
                    <select
                      value={formData.insuranceStatus}
                      onChange={(e) => handleInputChange("insuranceStatus", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    >
                      <option value="">Select status</option>
                      <option value="private">Private Insurance</option>
                      <option value="medicare">Medicare</option>
                      <option value="medicaid">Medicaid</option>
                      <option value="none">No Insurance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Treatment Goals & Additional Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Treatment Goals *
                  </label>
                  <textarea
                    value={formData.treatmentGoals}
                    onChange={(e) => handleInputChange("treatmentGoals", e.target.value)}
                    placeholder="What do you hope to achieve through holistic treatment? What would success look like for you?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                    placeholder="Is there anything else you'd like us to know about your situation?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={3}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                      className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the terms and conditions of the HealPath Sponsorship Program. 
                      I understand that approval is not guaranteed and that I must follow the 
                      recommended treatment plan if approved. I certify that all information 
                      provided is accurate and complete. *
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="FileText" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Sponsorship Application
            </h1>
          </div>
          <p className="text-gray-600">
            Complete this application to be considered for our healthcare sponsorship program
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              icon="ArrowLeft"
            >
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                variant="primary"
                onClick={nextStep}
                icon="ArrowRight"
                iconPosition="right"
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="accent"
                onClick={handleSubmit}
                icon="Send"
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center text-gray-600"
        >
          <p className="mb-2">
            Need help with your application? Contact us at{" "}
            <a href="mailto:support@healpath.com" className="text-primary-600 hover:text-primary-700">
              support@healpath.com
            </a>
          </p>
          <p className="text-sm">
            We typically review applications within 5-7 business days
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientApplication;