import { NavLink } from "react-router-dom";
import "./Character.css";

export const Character = ({ image, name, id }) => {
  
  return (
    
    <>
    
      <NavLink  to={`/character/${id}`} style={{ textDecoration: 'none' }} >
        <div className="character-container">
          <div className="img-container">
          <img className="img" src={image} alt={name} />
       
          </div>

          <div className="name-container" >
            <h2 className="name">{name}</h2>
          </div>
       
        </div>
      </NavLink>
    </>
  );
};
