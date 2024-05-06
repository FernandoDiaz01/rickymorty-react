import "./Detail.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const Detail = () => {
  const [characterData, setCharacterData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getCharacterDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/characters/${id}`
      );
      setCharacterData(response.data.character);
      console.log(response);
    } catch (error) {
      console.error("Hubo un error:", error);
    }
  };

  useEffect(() => {
    getCharacterDetail();
  }, [id]);

  const handleBackButton = () => {
    navigate("/home");
  };

  return (
    <div className="container-detail">
      <div className="title-button-detail-container">
        <div className="container-button-detail">
          <button className="btn" onClick={handleBackButton}>
            Back
          </button>
        </div>
        <div className="container-title-detail">

        <h1 className="title-detail">Detalles del Personaje</h1>
        </div>
      </div>
      {characterData && (
        <div className="container-character-detail">
          <div className="card-container-detail">
            <div className="img-container-detail">
              <img src={characterData.image} alt={characterData.name} />
            </div>
            <div className="character-detail-info">
              <ul className="container-list-detail">
                <li className="info-detail">
                  <strong>Name: {characterData.name}</strong>
                </li>
                <li className="info-detail">
                  <strong>Gender: {characterData.gender}</strong>
                </li>
                <li className="info-detail">
                  <strong>Species: {characterData.species}</strong>
                </li>
                <li className="info-detail">
                  <strong>Status: {characterData.status}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
