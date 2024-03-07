const express = require("express");
const sequelize = require("../db/dbase.cjs");
const Character = require("../models/CharacterModel.cjs");
const cors = require("cors");
const multer = require('multer')
const path = require('path')
const fs = require('node:fs');
const app = express();

const PORT = 3000;
//utilizar multer como middleware


app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



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
      console.log("Personajes obtenidos desde la base de datos:"/* , characters */);
      res.json({ source: "base_de_datos", characters });
    }
  } catch (error) {
    console.error("Error al obtener personajes desde la base de datos", error);
    res.status(500).send("Error del servidor");
  }
});
function saveImage(file){
  /* const newPath = `./uploads/${file}`;
   fs.renameSync('./uploads/', newPath);  */
  return file.path;  
}
const upload = multer({dest:'uploads/'})
// Ruta para recibir la imagen del form

app.post('/createcharacter', upload.single('image'), async (req, res) => {
  console.log(req.file)
    try {
      if (req?.file) {
        console.log('estoy dentro del if')
        const newPath =  saveImage(req.file)
        res.send('TErmiando')
        console.log(newPath)
      }
      
    /* const { name, gender, species, status } = req.body;
    const newCharacter = await Character.create({
      name,
      gender,
      species,
      status,
      image: newPath, // Guardar la ruta de la imagen en la base de datos
    });
    const personajeCreado = await Character.create(newCharacter);

    
    res.status(201).json({ message: 'Personaje creado con ID exclusivo', personaje: personajeCreado }); */
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);
    res.status(500).send('Error interno del servidor');
  }  
});





/* app.post("/api/characters", async (req, res) => {

  try {
    
    const ultimoID = await Character.max('id');

    const nuevoID = ultimoID ? ultimoID + 1 : 1;

    const nuevoPersonaje = {
        id: nuevoID,
        name: req.body.name,
        gender: req.body.gender,
        species: req.body.species,
        status: req.body.status,
        image: req.body.image
    };

   
    const personajeCreado = await Character.create(nuevoPersonaje);

    
    res.status(201).json({ message: 'Personaje creado con ID exclusivo', personaje: personajeCreado });
} catch (error) {
    console.error('Error al crear el personaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
}); */
