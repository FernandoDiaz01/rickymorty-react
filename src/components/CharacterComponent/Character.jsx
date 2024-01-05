import { NavLink } from "react-router-dom";
import "./Character.css";

export const Character = ({ image, name, id }) => {
  return (
    
    <>
    
      <NavLink to={"/character/" + { id }}>
        <li className="character">
          <img src={image} alt={name} />
          <div>
            <h2>{name}</h2>
          </div>
        </li>
      </NavLink>
    </>
  );
};
