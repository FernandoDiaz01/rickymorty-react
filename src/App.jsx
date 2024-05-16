import React, { useState, useEffect } from 'react';
import './App.css';
import { getCharacters } from './services/getCharacters.js';
import { MyRoutes } from './routers/routes.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
   
     
      const fetchData = async () => {
        setLoader(true);
        try {
          
          const newCharacters = await getCharacters(page);
          setCharacters(newCharacters);
          
      
          if (newCharacters.length < 20) {
            setHasMore(false);
          }
        } catch (error) {
          console.error('Error fetching characters', error);
        } finally {
          setLoader(false);
        }
      };
  
      fetchData();
    
    
    
  }, []);

  
  const fetchMoreData = async () => {
    try {
      setLoader(true);
      const newCharacters = await getCharacters(page + 1);
      
      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
      setPage((prevPage) => prevPage + 1);

      if (newCharacters.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more characters', error);
    } finally {
      setLoader(false);
    }
  };  

  return (
    <>
      
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchMoreData}
        hasMore={hasMore}
        /* loader={<p>Loading characters...</p>} */
       
      >
     
      </InfiniteScroll>
      <MyRoutes characters={characters} />
    </>
  );
}

export default App;
