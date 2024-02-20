const express = require("express");
const sequelize = require("../db/dbase.cjs");
const Character = require("../models/CharacterModel.cjs");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

// Ruta para obtener todos los personajes
app.get("/api/characters", async (req, res) => {
  try {
    console.log("Intentando obtener personajes desde la base de datos...");
    const characters = await Character.findAll();
    if (characters.length === 0) {
      res
        .status(404)
        .json({ message: "No se encontraron personajes en la base de datos" });
    } else {
      console.log("Personajes obtenidos desde la base de datos:", characters);
      res.json({ source: "base_de_datos", characters });
    }
  } catch (error) {
    console.error("Error al obtener personajes desde la base de datos", error);
    res.status(500).send("Error del servidor");
  }
});


app.post("/api/characters", async (req, res) => {

  const { name, gender, species, status, image } = req.body;

  



  try {
    
    const existingCharacter = await Character.findOne({
      where: { name: req.body.name }
    });
    
    if (existingCharacter) {
      console.error("El personaje ya existe");
      return res.status(400).json({ error: "El personaje ya existe" });
    }
    const newCharacter = await Character.create({
      name,
      gender,
      species,
      status,
      image
    });

    console.log("Character created", newCharacter);
    res.json(newCharacter);
  } catch (error) {
    console.error("Error al crear el personaje", error);
    res.status(500).json({ error: "Error interno del server" });
  }
});
