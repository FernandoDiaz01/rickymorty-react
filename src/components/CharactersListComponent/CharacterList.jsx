
import { Character } from '../CharacterComponent/Character.jsx';
import { NavLink } from 'react-router-dom';

import './CharacterList.css';

export const CharacterList = ({characters}) => {
  
 
  return (
    <div className="container-character-list">
      <div className="container-title-buttons-character-list">
        <NavLink to="/">
          <button className='btn-character-list'>Back</button>
        </NavLink>
        <h1 className='title-characters-list'>List of Characters</h1>
        <NavLink to={'/createcharacter'}>
          <button className='btn-character-list'>Create Character</button>
        </NavLink>
      </div>
      <ul className='character-list'>
        {characters?.map((character) => (
          <Character
          key={character.id}
            {...character}
          />
        ))}
      </ul>
    </div>
  );
};