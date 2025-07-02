import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { AuthContext } from '@/App';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

  const navigation = [
    { name: "Find Providers", href: "/providers" },
    { name: "AI Search", href: "/ai-search" },
    { name: "Sponsorship Program", href: "/sponsorship" },
    { name: "For Practitioners", href: "/apply-practitioner" },
    { name: "Resources", href: "/resources" }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Heart" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold gradient-text">
              HealPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

{/* CTA Button and User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName || user?.name || 'User'}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/apply-patient">
                <Button variant="accent" size="sm">
                  Apply for Sponsorship
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <ApperIcon name={isMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 py-4"
          >
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
<div className="pt-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 px-4 py-2">
                      Welcome, {user?.firstName || user?.name || 'User'}
                    </div>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/apply-patient" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="accent" size="sm" className="w-full">
                      Apply for Sponsorship
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;