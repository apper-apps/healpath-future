import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SponsorshipProgram = () => {
  const eligibilityRequirements = [
    "Diagnosis of chronic condition or pain disorder",
    "Household income below 400% of Federal Poverty Level",
    "Unable to afford holistic treatment without assistance",
    "Committed to following treatment plan",
    "Residing in the United States"
  ];

  const coverageTypes = [
    {
      icon: "DollarSign",
      title: "Full Treatment Coverage",
      description: "100% of treatment costs covered for qualifying patients",
      requirements: "Income below 200% FPL"
    },
    {
      icon: "Percent",
      title: "Partial Coverage",
      description: "50-75% of treatment costs covered",
      requirements: "Income 200-300% FPL"
    },
    {
      icon: "CreditCard",
      title: "Payment Assistance",
      description: "Interest-free payment plans and reduced rates",
      requirements: "Income 300-400% FPL"
    }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Complete Application",
      description: "Fill out our comprehensive application form with your health and financial information"
    },
    {
      step: 2,
      title: "Submit Documentation",
      description: "Provide required documents including medical records and income verification"
    },
    {
      step: 3,
      title: "Review Process",
      description: "Our team reviews your application and matches you with appropriate providers"
    },
    {
      step: 4,
      title: "Get Approved",
      description: "Receive your approval and connect with your assigned provider"
    }
  ];

  const faqs = [
    {
      question: "Who is eligible for the sponsorship program?",
      answer: "Patients with chronic conditions who meet our income requirements and are committed to holistic treatment approaches are eligible to apply."
    },
    {
      question: "What types of treatments are covered?",
      answer: "We cover functional medicine consultations, chiropractic care, acupuncture, naturopathic medicine, health coaching, and other verified holistic treatments."
    },
    {
      question: "How long does the application process take?",
      answer: "Most applications are reviewed within 5-7 business days. Complex cases may take up to 2 weeks for full review."
    },
    {
      question: "Can I choose my own provider?",
      answer: "Yes! You can request specific providers from our network, and we'll work to match you based on availability and your specific needs."
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
              <ApperIcon name="Heart" className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Healthcare Sponsorship Program
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Breaking down financial barriers to holistic healthcare. Get the treatment 
              you need with our comprehensive sponsorship program.
            </p>
            <Link to="/apply-patient">
              <Button variant="accent" size="lg" icon="FileText">
                Apply Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Program Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              How Our Program Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe everyone deserves access to quality holistic healthcare, 
              regardless of their financial situation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coverageTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name={type.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <div className="text-sm text-primary-600 font-medium">
                  {type.requirements}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Eligibility Requirements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              Eligibility Requirements
            </h2>
            <p className="text-gray-600 mb-8">
              To qualify for our sponsorship program, applicants must meet the following criteria:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eligibilityRequirements.map((requirement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <ApperIcon name="CheckCircle" className="w-5 h-5 text-success mt-0.5" />
                  <span className="text-gray-700">{requirement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Application Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Application Process
            </h2>
            <p className="text-xl text-gray-600">
              Getting started is simple. Follow these four easy steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
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
              Get answers to common questions about our sponsorship program
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
                <p className="text-gray-600">
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
            Ready to Apply?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards affordable holistic healthcare. 
            Our application process is straightforward and confidential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply-patient">
              <Button variant="accent" size="lg" icon="FileText">
                Start Application
              </Button>
            </Link>
            <Link to="/providers">
              <Button variant="outline" size="lg" icon="Search">
                Browse Providers First
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SponsorshipProgram;