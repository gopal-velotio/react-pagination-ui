import React, { useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import NewsCard from '../NewsCard';

const News: React.FC = () => {
  const [hits, setHits] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('startups');
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const URL = `https://hn.algolia.com/api/v1/search?query=${query}&page=${currentPage}`;

  const handleFetch = async () => {
    try {
      setIsLoaded(false);
      const result = await axios.get(URL);
      console.log(result);
      setHits(result.data.hits);
      setIsLoaded(true);
      setPageCount(result.data.nbPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
    handleFetch();
  };

  return (
    <div>
      <div>
        <label>Search: </label>
        <input value={query} onChange={(evt) => setQuery(evt.target.value)} />
      </div>
      <button onClick={handleFetch}>Search</button>

      {isLoaded ? (
        hits.map((news: any) => {
          return (
            <NewsCard
              key={news.objectID}
              title={news.title}
              url={news.url}
              author={news.author}
            />
          );
        })
      ) : (
        <h4>Loading ...</h4>
      )}

      {isLoaded ? (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={'container'}
            previousLinkClassName={'page'}
            breakClassName={'page'}
            nextLinkClassName={'page'}
            pageClassName={'page'}
            disabledClassName={'disabled'}
            activeClassName={'active'}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default News;
