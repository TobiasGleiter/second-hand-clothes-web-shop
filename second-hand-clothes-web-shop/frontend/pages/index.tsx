import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import Link from "next/link";

const LandingPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/articles");
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterArticles(event.target.value, sizeFilter);
  };

  const handleSizeFilter = (event) => {
    setSizeFilter(event.target.value);
    filterArticles(searchTerm, event.target.value);
  };

  const filterArticles = (searchTerm, sizeFilter) => {
    let filtered = articles.filter((article) =>
      article.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sizeFilter) {
      filtered = filtered.filter((article) => article.size === sizeFilter);
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="landing-page">
    <header className="header">
      <h1>Second-Hand Clothes Web Shop</h1>
      <nav>
        {/* Navigation items */}
      </nav>
    </header>
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by article name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select onChange={handleSizeFilter} value={sizeFilter}>
        <option value="">Filter by size</option>
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
      </select>
    </div>
    <div className="article-grid">
      {filteredArticles.map((article) => (
        <div key={article.id} className="article-card">
          <h2>{article.name}</h2>
          <p>Size: {article.size}</p>
          <p>Category: {article.category}</p>
          <p>Price: {article.price}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default LandingPage;