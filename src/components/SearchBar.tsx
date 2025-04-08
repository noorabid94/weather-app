// import React, { useState } from "react";
// import "@/styles/SearchBar.css";

// interface SearchBarProps {
//   handleSearch: (city: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
//   const [input, setInput] = useState<string>("");

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     handleSearch(input.trim());
//     setInput(""); 
//   };

//   return (
//     <form className="search-bar" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Enter city name..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchBar;







import React, { useState } from "react";
import "@/styles/SearchBar.css";
import { toast } from "react-toastify";

interface SearchBarProps {
  handleSearch: (city: string) => void;
  cities: string[]; // List of valid cities
  setError: (message: string) => void; // Prop to set the error message in parent
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch, cities, setError }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cityInput = input.trim();

    // Check if the city is in the list of valid cities
    const isValid = cities.some(
      (city) => city.toLowerCase() === cityInput.toLowerCase()
    );

    if (!isValid) {
      setError("City not found. Please try again."); // Set error message in the parent
      toast.error("City not found. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    handleSearch(cityInput); // Proceed with search if city is valid
    setInput(""); // Clear input field
    setError(""); // Clear previous errors
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
