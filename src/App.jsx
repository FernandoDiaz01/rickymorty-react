import { useState, useEffect, useCallback  } from 'react';
import { InView } from "react-intersection-observer";
import './App.css'
import getCharacters from './services/getCharacters.js'
import { MyRoutes } from './routers/routes.jsx';
import { CharacterList } from './components/CharactersComponent/CharacterList.jsx';
import { Detail } from './components/CharacterDetail/Detail.jsx';

function App() {
const [characters, setCharacters] = useState([])
const [page, setPage] = useState(1)



const gettingCharacters = useCallback(async (pageNum) => {
  try {
    const results = await getCharacters(pageNum);
    setCharacters((prev) => [...prev, ...results]); 
  } catch (error) {
    console.error("Error fetching characters:", error);
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
    <h1>Welcome to Ricky and Morty App</h1>
      <MyRoutes characters={characters}/>
    
     <InView
        as="div"
        onChange={loadMoreCharacters}
        rootMargin="0px 0px 100px 0px" 
      >
        Cargando más personajes...
      </InView>
        </>
  )
}

export default App
