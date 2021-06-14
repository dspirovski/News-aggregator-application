import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';
import "./App.css";

function Category() {
  const [categoryArticles, setCategoryArticles] = useState([]);
  let { categoryName } = useParams();

  const getCategoryNews = useCallback(
    async () => {
      const currentDate = moment().format("YYYY-MM-DD");
      const url = `https://newsapi.org/v2/everything?q=${categoryName}&from=${currentDate}&sortBy=publishedAt&apiKey=898a69cebae444e49a066fa76fe1b7d8`;
      const response = await fetch(url);
      const data = await response.json();
      setCategoryArticles(data.articles);
    },
    [categoryName],
  );

  useEffect(() => {
    getCategoryNews();
    // eslint-disable-next-line
  }, [categoryName]);

  return (
    <div>
      {categoryArticles.map((article, index) => {
        return (
          <div className="category-item" key={`category-${article.description}`}>
            <h3 className="category-name">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h3>
            <p>{article.title}</p>
            <p>{article.content}</p>
            <img src={article.urlToImage} alt="article_image" height="50" />
          </div>
        );;
      })}
    </div>
  );
}

export default Category;
