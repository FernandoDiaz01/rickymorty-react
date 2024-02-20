
import { NavLink, useNavigate } from 'react-router-dom';
import {Character} from '../CharacterComponent/Character'


import './CharacterList.css'

export const CharacterList = ({ characters }) => {

  let navigate = useNavigate()

  const backToHome = () =>{
    navigate('/')
  }


  return (
    <div className="container-character-list">
      <div className="container-title-buttons-character-list">
    <NavLink><button onClick={backToHome} className='btn-character-list'>Back</button></NavLink>  
      <h1 className='title-characters-list'>List of Characters</h1>
    <NavLink to={'/create-character'}><button className='btn-character-list'>Create Character</button></NavLink>  
    </div>
    <ul className='character-list'>
      {characters?.map((character) => (
       
          <Character {...character} />
      ))}
    </ul>
    </div>
  );
};




