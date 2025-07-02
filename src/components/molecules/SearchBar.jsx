import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, placeholder = "Search providers...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Debounced search could be added here
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`flex gap-3 ${className}`}
    >
      <Input
        icon="Search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="flex-1"
      />
      <Button type="submit" icon="Search" className="px-6">
        Search
      </Button>
    </motion.form>
  );
};

export default SearchBar;