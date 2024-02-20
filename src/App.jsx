import { useState, useEffect, useCallback  } from 'react';
import { InView } from "react-intersection-observer";
import './App.css'
import  {getCharacters}  from './services/getCharacters.js'
import { MyRoutes } from './routers/routes.jsx';


function App() {
const [characters, setCharacters] = useState([])
const [page, setPage] = useState(1)



const gettingCharacters = useCallback(async (pageNum) => {
  try {
    const results = await getCharacters(pageNum);

    // Verifica si results es un array antes de intentar iterar
    if (Array.isArray(results)) {
      setCharacters((prev) => [...prev, ...results]);
    } else {
      console.error('Error: results is not an array', results);
    }
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
}, []);


const loadMoreCharacters = () => {
  setPage((prev) => prev + 1);
};



useEffect(() => {
  gettingCharacters(page);
}, [ page]);


  return (
    <>
    
      <MyRoutes characters={characters}/>
    
     <InView
        as="div"
        onChange={loadMoreCharacters}
        rootMargin="0px 0px 100px 0px" 
      >
   
      </InView> 
        </>
  )
}

export default App
