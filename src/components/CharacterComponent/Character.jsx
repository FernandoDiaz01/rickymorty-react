import { NavLink } from 'react-router-dom'
import './Character.css'



export const Character = ({ image, name, gender, species, origin, location,id }) => {
    return (
      
        <>
        
        <NavLink to={'/character/' + {id}} target='__blank'> 
          
      <li className='character'>
        <img src={image} alt={name} />
        <div>
          <h2>{name}</h2>
          <ul className='character__info'>
            <li>Gender: {gender}</li>
            <li>Species: {species}</li>
            <li>Origin: {origin.name}</li>
            <li>Location: {location.name}</li>
            <li>Id:{id} </li>
          </ul>
        </div>
      </li>
      </NavLink>
      </>
    )
  }