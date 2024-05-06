import { NavLink } from "react-router-dom";
import "./Character.css";

export const Character = ({ image, name, id }) => {



  
  return (
    <>
    
      <NavLink  to={`/character/${id}`} style={{ textDecoration: 'none' }} >
      <div className="character-card">
      
   
      <img src={image} alt={`${name}`} sizes="(min-width: 300px) 200px, 50vw"/>
      <h3 className="name-character">{name}</h3>

    </div>
      </NavLink>
    </>
  );
};
