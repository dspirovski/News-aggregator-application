import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import "./App.css";
import { flatten } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

const ITEMS_PER_PAGE = 10;

function NewsList() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [initialNews, setInitialNews] = useState([]);
  const [startIndex, setStartIndex] = useState(10);
  const [endIndex, setEndIndex] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const getCategoryNews = useCallback(
    async (categoryName) => {
      const currentDate = moment().format("YYYY-MM-DD");
      const url = `https://newsapi.org/v2/everything?q=${categoryName}&from=${currentDate}&sortBy=publishedAt&apiKey=898a69cebae444e49a066fa76fe1b7d8`;
      const response = await fetch(url);
      const data = await response.json();
      const articles = data.articles;
      for (let i = 0; i < articles.length; i++) {
        articles[i].category = categoryName;
      }
      return articles;
    },
    // eslint-disable-next-line
    [],
  );

  // eslint-disable-next-line
  useEffect(async () => {
    let articles = [];
    const categories = ['tesla', 'apple'];
    for (let i = 0; i < categories.length; i++) {
      articles = [...articles, await getCategoryNews(categories[i])];
      articles = flatten(articles);
    }
    setNews(articles);
    const filteredNews = articles.slice([0], [ITEMS_PER_PAGE]);
    setFilteredNews(filteredNews);
    setInitialNews(filteredNews);
    // eslint-disable-next-line
  }, []);

  function handleSearch(e) {
    const value = e.target.value;
    if (value) {
      const searched = news.filter((item) => (item.content.includes(value)) || (item.title.includes(value)));
      setFilteredNews(searched);
    } else {
      setFilteredNews(initialNews);
    }
  }

  const getNextItems = useCallback(
    async () => {
      let items = [...filteredNews];
      const newItems = news.slice([startIndex], [endIndex]);
      items = [...items, ...newItems];
      setStartIndex(startIndex + ITEMS_PER_PAGE);
      setEndIndex(endIndex + ITEMS_PER_PAGE);
      setFilteredNews(items);
      const hasMoreItems = news.length > filteredNews.length;
      setHasMore(hasMoreItems);
    },
    [endIndex, filteredNews, news, startIndex, setStartIndex, setEndIndex, setFilteredNews, setHasMore],
  );

  return (
    <div>
      <input type="text" className="searchbar" placeholder="search..." onChange={handleSearch} />
      <InfiniteScroll
        dataLength={filteredNews.length}
        next={getNextItems}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {filteredNews.map((article, index) => {
          return (
            <div className="category-item" key={article.description}>
              <h3 className="category-name">{(article.category).toUpperCase()}</h3>
              <p>{article.title}</p>
              <p>{article.content}</p>
              <img src={article.urlToImage} alt="article_image" height="50" />
            </div>
          )
        })}
      </InfiniteScroll>
    </div>
  );
}

export default NewsList;