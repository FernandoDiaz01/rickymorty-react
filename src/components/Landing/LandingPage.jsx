import "./LandingPage.css";
import { NavLink } from "react-router-dom";
import imgLanding from '../../images/rickandmortylanding.jpg';

export const LandingPage = () => {
  return (
    <div className="container-landing">
      <img src={imgLanding} alt="" className="img-landing" />
      <div className="text-btn-container">
        <h1 className="title-landing">Welcome to Rick and Morty App!</h1>

        <NavLink to={"/home"}>
          <div className="btn-container">
            <button className="btn">Click me!</button>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
