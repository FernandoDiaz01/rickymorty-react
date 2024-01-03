import { NavLink } from 'react-router-dom'
import {Character} from '../CharacterComponent/Character'


import './CharacterList.css'

export const CharacterList = ({ characters }) => {
  return (
    <ul className='character-list'>
      {characters?.map((character) => (
        <NavLink key={character.id} to={`/character/${character.id}`} target='_blank'>
          <Character {...character} />
        </NavLink>
      ))}
    </ul>
  );
};




