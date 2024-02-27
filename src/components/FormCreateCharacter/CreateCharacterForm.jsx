import React, { useState } from "react";
import "./CreateCharacterForm.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export const CreateCharacterForm = () => {

  
  let navigate = useNavigate()


  const [characterData, setCharacterData] = useState({
    name: "",
    gender: "",
    species: "",
    status: "",
    image: "",
  });

  const [imageBlob, setImageBlob] = useState();

  /* const [selectedFileName, setSelectedFileName] = useState('') */

  const handleChange = (e) => {
    setCharacterData({
      ...characterData,
      [e.target.name]: e.target.value,
    });
  };

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  const handleImageChange = (e) => {
    
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setCharacterData({
          ...characterData,
          image: reader.result,
        });
      };

      if (!allowedTypes.includes(selectedImage.type)) {
        alert(
          "Formato de archivo no válido. Por favor, selecciona una imagen JPEG, PNG o GIF."
        );
        e.target.value = "";
        return;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(characterData);
    try {
      const response = await axios.post("http://localhost:3000/api/characters", characterData);

    

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  const buttonBack = () =>{
    navigate('/home')
}

  return (
    <>
      <div className="container-title-character-form">
        <h1 className="title-character-form">Create Your Character</h1>
      </div>
      <div className="container-button">
      <button onClick={buttonBack} className="btn">Back</button>
    </div>
      <div className="container-all">
        <div className="container-form">
          <form onSubmit={handleSubmit}>
            <label className="text-label">
              Image:
              <input
                type="file"
                name="image"
                 accept="image/*"
                onChange={handleImageChange}
              />
            
            </label>
            <label className="text-label">
              Nombre:
              <input
                type="text"
                name="name"
                value={characterData.name}
                onChange={handleChange}
              />
            </label>
            <label className="text-label">
              Gender:
              <input
                type="text"
                name="gender"
                value={characterData.gender}
                onChange={handleChange}
              />
            </label>
            <label className="text-label">
              Species:
              <input
                type="text"
                name="species"
                value={characterData.species}
                onChange={handleChange}
              />
            </label>
            <label className="text-label">
              Status:
              <input
                type="text"
                name="status"
                value={characterData.status}
                onChange={handleChange}
              />
            </label>
            <button className="btn-form" type="submit">
              Create Character
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
