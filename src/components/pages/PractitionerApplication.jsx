import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const PractitionerApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Practice Information
    practiceName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Professional Information
    licenseNumber: "",
    licenseState: "",
    yearsExperience: "",
    specialties: [],
    credentials: "",
    education: "",
    
    // Services & Insurance
    servicesOffered: "",
    insuranceAccepted: [],
    paymentOptions: "",
    averageSessionCost: "",
    
    // References & Verification
    references: "",
    malpracticeInsurance: "",
    backgroundCheck: false,
    agreeToTerms: false
  });

  const totalSteps = 4;

  const specialtyOptions = [
    "Functional Medicine",
    "Chiropractic Care",
    "Naturopathic Medicine",
    "Acupuncture",
    "Traditional Chinese Medicine",
    "Health Coaching",
    "Massage Therapy",
    "Nutrition Counseling",
    "Herbal Medicine",
    "Homeopathy"
  ];

  const insuranceOptions = [
    "Blue Cross Blue Shield",
    "Aetna",
    "United Healthcare",
    "Cigna",
    "Humana",
    "Kaiser Permanente",
    "Premera",
    "Regence",
    "Self-pay only",
    "HSA/FSA accepted"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (field, option) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.practiceName;
      case 2:
        return formData.licenseNumber && formData.licenseState && formData.yearsExperience && formData.specialties.length > 0;
      case 3:
        return formData.servicesOffered && formData.averageSessionCost;
      case 4:
        return formData.references && formData.agreeToTerms && formData.backgroundCheck;
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
      
      toast.success("Application submitted successfully! We'll review your application and contact you within 7-10 business days.");
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        practiceName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        licenseNumber: "",
        licenseState: "",
        yearsExperience: "",
        specialties: [],
        credentials: "",
        education: "",
        servicesOffered: "",
        insuranceAccepted: [],
        paymentOptions: "",
        averageSessionCost: "",
        references: "",
        malpracticeInsurance: "",
        backgroundCheck: false,
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
                Practice Information
              </h3>
              <div className="space-y-6">
                <Input
                  label="Practice/Business Name *"
                  value={formData.practiceName}
                  onChange={(e) => handleInputChange("practiceName", e.target.value)}
                  placeholder="Enter your practice name"
                />
                
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <Input
                  label="Website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Practice Address</h4>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your practice address"
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
                Professional Credentials
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="License Number *"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    placeholder="Enter your license number"
                  />
                  <Input
                    label="License State *"
                    value={formData.licenseState}
                    onChange={(e) => handleInputChange("licenseState", e.target.value)}
                    placeholder="State where licensed"
                  />
                </div>

                <Input
                  label="Years of Experience *"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                  placeholder="Years practicing"
                  min="0"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specialties * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {specialtyOptions.map((specialty) => (
                      <label key={specialty} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.specialties.includes(specialty)}
                          onChange={() => handleMultiSelectChange("specialties", specialty)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credentials & Certifications
                  </label>
                  <textarea
                    value={formData.credentials}
                    onChange={(e) => handleInputChange("credentials", e.target.value)}
                    placeholder="List your professional credentials, certifications, and training (e.g., MD, ND, DC, LAc, etc.)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education & Training
                  </label>
                  <textarea
                    value={formData.education}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                    placeholder="Describe your educational background and relevant training"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={4}
                  />
                </div>
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
                Services & Pricing
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Services Offered *
                  </label>
                  <textarea
                    value={formData.servicesOffered}
                    onChange={(e) => handleInputChange("servicesOffered", e.target.value)}
                    placeholder="Describe the services you offer (e.g., initial consultations, follow-up visits, specific treatments, etc.)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Insurance Accepted (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {insuranceOptions.map((insurance) => (
                      <label key={insurance} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.insuranceAccepted.includes(insurance)}
                          onChange={() => handleMultiSelectChange("insuranceAccepted", insurance)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{insurance}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Options
                  </label>
                  <textarea
                    value={formData.paymentOptions}
                    onChange={(e) => handleInputChange("paymentOptions", e.target.value)}
                    placeholder="Describe your payment options (payment plans, sliding scale, etc.)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={3}
                  />
                </div>

                <Input
                  label="Average Session Cost *"
                  value={formData.averageSessionCost}
                  onChange={(e) => handleInputChange("averageSessionCost", e.target.value)}
                  placeholder="e.g., $150-200 per session"
                />
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
                References & Verification
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional References *
                  </label>
                  <textarea
                    value={formData.references}
                    onChange={(e) => handleInputChange("references", e.target.value)}
                    placeholder="Provide contact information for 2-3 professional references who can speak to your clinical skills and character"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Malpractice Insurance Information
                  </label>
                  <textarea
                    value={formData.malpracticeInsurance}
                    onChange={(e) => handleInputChange("malpracticeInsurance", e.target.value)}
                    placeholder="Provide details about your malpractice insurance coverage"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.backgroundCheck}
                        onChange={(e) => handleInputChange("backgroundCheck", e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">
                        I consent to a background check and license verification as part of 
                        the application process. *
                      </span>
                    </label>
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
                        I agree to the HealPath Provider Network terms and conditions. I understand 
                        that acceptance into the network is subject to verification of credentials 
                        and references. I commit to providing quality care to sponsored patients 
                        and following HealPath's patient care guidelines. *
                      </span>
                    </label>
                  </div>
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
              <ApperIcon name="UserPlus" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Join Our Provider Network
            </h1>
          </div>
          <p className="text-gray-600">
            Apply to become a verified provider in the HealPath network
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
            Questions about joining our network? Contact us at{" "}
            <a href="mailto:providers@healpath.com" className="text-primary-600 hover:text-primary-700">
              providers@healpath.com
            </a>
          </p>
          <p className="text-sm">
            We typically review provider applications within 7-10 business days
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PractitionerApplication;