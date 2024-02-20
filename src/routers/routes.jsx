import { Routes, Route} from 'react-router-dom';
import { CharacterList } from '../components/CharactersListComponent/CharacterList';
import { Detail } from '../components/CharacterDetail/Detail';
import { LandingPage } from '../components/Landing/LandingPage';
import { CreateCharacter } from '../components/CreatedCharacterComponent/CreatedCharacter';
import { CreateCharacterForm } from '../components/FormCreateCharacter/CreateCharacterForm';




export const MyRoutes = ({characters}) => {
  return (
        
        <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/home' element={<CharacterList characters={characters} />} />
            <Route exact path='/character/:id' element={<Detail/>}  />
            <Route exact path='/create-character' element={<CreateCharacterForm/>}  />
            <Route exact path='/character-created' element={<CreateCharacter />}  />
        </Routes>
   
    
  )
}
