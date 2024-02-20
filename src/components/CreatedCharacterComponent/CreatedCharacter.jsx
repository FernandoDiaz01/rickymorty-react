import React from 'react'
import homer from '../../images/homer.png'
import { useNavigate } from 'react-router-dom'

export const CreateCharacter = () => {

    let navigate = useNavigate()

    const buttonBack = () =>{
        navigate('/home')
    }


  return (
    <div className="container-detail">
  <div className="title-detail-container">
    <div className="container-button">
      <button onClick={buttonBack} className="btn">Back</button>
    </div>
    <h1 className="title-detail">Your Character</h1>
  </div>
      
        <div className="container-detail">
          <div className="card-container-detail">
            <div className="img-container-detail">
              <img src={homer}  />
            </div>
            <div className="character-detail-info">
              <ul>
                <li className="info-detail">
                  {" "}
                  <strong>Name: Homer </strong>
                </li>
                <li className="info-detail">
                  {" "}
                  <strong>Gender: Male</strong>{" "}
                </li>
                <li className="info-detail">
                  <strong>Species: Yellow</strong>{" "}
                </li>
                <li className="info-detail">
                  <strong>Status:Alive</strong>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
     
    </div>
  )
}
