import React, { useState } from "react";
import "./CreateCharacterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateCharacterForm = () => {
  let navigate = useNavigate();

  const [characterData, setCharacterData] = useState({
    name: "",
    gender: "",
    species: "",
    status: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCharacterData({
        ...characterData,
        image: file,
      });
    }
  };

  const handleChange = (e) => {
    setCharacterData({
      ...characterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", characterData.name);
      formData.append("gender", characterData.gender);
      formData.append("species", characterData.species);
      formData.append("status", characterData.status);
      formData.append("image", characterData.image);

      const response = await axios.post(
        "http://localhost:3000/createcharacter",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);
      setMessage("¡Personaje creado con éxito!");

       setTimeout(() => {
        navigate("/home");
      }, 5000); 

    
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error);
    }
  };

  return (
    <>
      <div className="container-all">
      <div className="container-title-character-form">
          <div className="container-button">
            <button onClick={() => navigate("/home")} className="btn">
              Back
            </button>
          </div>
          <h1 className="title-character-form">Create Your Character</h1>
        </div>
        <div className="container-form">
          <form
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <label className="text-label">
              Image:
              <input
                required
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <label className="text-label">
              Nombre:
              <input
                required
                type="text"
                name="name"
                value={characterData.name}
                onChange={handleChange}
              />
            </label>
            <label className="text-label">
              Gender:
              <select
                required
                name="gender"
                value={characterData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>
            <label className="text-label">
              Species:
              <select
                required
                name="species"
                value={characterData.species}
                onChange={handleChange}
              >
                <option value="">Select Species</option>
                <option value="human">Human</option>
                <option value="alien">Alien</option>
              </select>
            </label>
            <label className="text-label">
              Status:
              <select
                required
                name="status"
                value={characterData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
              </select>
            </label>
            <button className="btn" type="submit">
              Create Character
            </button>
          </form>
          {message && (
            <div className="container-success-message">
              <p className="success-message">{message} </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
