import React, { useState } from "react";
import "@/styles/SearchBar.css";

interface SearchBarProps {
  handleSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSearch(input.trim());
    setInput(""); // Clears input after search
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
