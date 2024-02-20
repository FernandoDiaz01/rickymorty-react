import "./Detail.css";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export const Detail = () => {
  const [characterDetail, setCharacterDetail] = useState({});

  let navigate = useNavigate()

  let { id } = useParams();

  const getCharactersDetail = async () => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      const data = response.data;
      console.log(data);
      setCharacterDetail(data);
    } catch (error) {
      console.error("Hubo un error:", error);
    }
  };

  useEffect(() => {
    getCharactersDetail();
  }, []);

  const handleBackButton = () =>{
    navigate('/home')
  }

  return (
    <div className="container-detail">
  <div className="title-detail-container">
    <div className="container-button">
      <button className="btn" onClick={handleBackButton}>Back</button>
    </div>
    <h1 className="title-detail">Detalles del Personaje</h1>
  </div>
      {characterDetail && (
        <div className="container-detail">
          <div className="card-container-detail">
            <div className="img-container-detail">
              <img src={characterDetail.image} alt={characterDetail.name} />
            </div>
            <div className="character-detail-info">
              <ul>
                <li className="info-detail">
                  {" "}
                  <strong>Name: {characterDetail.name} </strong>
                </li>
                <li className="info-detail">
                  {" "}
                  <strong>Gender: {characterDetail.gender}</strong>{" "}
                </li>
                <li className="info-detail">
                  <strong>Species: {characterDetail.species}</strong>{" "}
                </li>
                <li className="info-detail">
                  <strong>Status: {characterDetail.status}</strong>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
