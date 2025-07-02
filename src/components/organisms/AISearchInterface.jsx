import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import providerService from "@/services/api/providerService";
import ProviderCard from "@/components/molecules/ProviderCard";
import Loading from "@/components/ui/Loading";

const AISearchInterface = () => {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: "Hi! I'm here to help you find the right holistic health provider. Tell me about what you're experiencing or what kind of treatment you're looking for."
    }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchedProviders, setMatchedProviders] = useState([]);
  const [searchStep, setSearchStep] = useState("initial");

  const symptomQuestions = [
    "What specific symptoms or conditions are you experiencing?",
    "How long have you been dealing with these symptoms?",
    "What treatments have you tried before?",
    "Do you have any location preferences?",
    "Are there specific types of practitioners you're interested in?"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    const userMessage = { type: "user", content: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setUserResponses(prev => [...prev, currentInput]);

    setIsLoading(true);
    setCurrentInput("");

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (currentQuestionIndex < symptomQuestions.length - 1) {
        // Continue with next question
        const nextQuestion = symptomQuestions[currentQuestionIndex + 1];
        setMessages(prev => [...prev, { type: "ai", content: nextQuestion }]);
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Final step - search for providers
        const symptoms = userResponses.concat(currentInput);
        const providers = await providerService.searchBySymptoms(symptoms);
        
        setMatchedProviders(providers);
        setMessages(prev => [...prev, {
          type: "ai",
          content: `Based on your responses, I found ${providers.length} providers who might be able to help you. Here are my recommendations:`
        }]);
        setSearchStep("results");
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        type: "ai",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again or browse our provider directory directly."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickOption = (option) => {
    setCurrentInput(option);
    handleSendMessage();
  };

  const startOver = () => {
    setMessages([
      {
        type: "ai",
        content: "Hi! I'm here to help you find the right holistic health provider. Tell me about what you're experiencing or what kind of treatment you're looking for."
      }
    ]);
    setCurrentInput("");
    setMatchedProviders([]);
    setSearchStep("initial");
    setCurrentQuestionIndex(0);
    setUserResponses([]);
  };

  const quickOptions = [
    "Chronic pain",
    "Digestive issues",
    "Fatigue and energy",
    "Stress and anxiety",
    "Hormone imbalance",
    "Autoimmune condition"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Health Assistant</h3>
                <p className="text-sm text-gray-500">Finding the right provider for you</p>
              </div>
            </div>
            <Button variant="ghost" onClick={startOver} className="text-sm">
              Start Over
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === "user"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Options */}
        {searchStep === "initial" && messages.length === 1 && (
          <div className="border-t border-gray-100 p-4">
            <p className="text-sm text-gray-600 mb-3">Or choose from common concerns:</p>
            <div className="flex flex-wrap gap-2">
              {quickOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleQuickOption(option)}
                  className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        {searchStep !== "results" && (
          <div className="border-t border-gray-100 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your response here..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentInput.trim() || isLoading}
                icon="Send"
                variant="primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Provider Results */}
      {searchStep === "results" && matchedProviders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Recommended Providers
            </h3>
            <p className="text-gray-600">
              These providers match your needs based on our conversation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {matchedProviders.map((provider) => (
              <ProviderCard key={provider.Id} provider={provider} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AISearchInterface;