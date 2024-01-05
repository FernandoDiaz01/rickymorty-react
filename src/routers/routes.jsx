import { Routes, Route} from 'react-router-dom';
import { CharacterList } from '../components/CharactersComponent/CharacterList';
import { Detail } from '../components/CharacterDetail/Detail';



export const MyRoutes = ({characters}) => {
  return (
        
        <Routes>
            <Route exact path='/' element={<CharacterList characters={characters} />} />
            <Route exact path='/character/:id' element={<Detail/>}  />
        </Routes>
   
    
  )
}
