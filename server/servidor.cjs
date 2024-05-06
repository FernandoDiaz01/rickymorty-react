const express = require("express");
const sequelize = require("../db/dbase.cjs");
const Character = require("../models/CharacterModel.cjs");
const cors = require("cors");
const multer = require("multer");
const fs = require("node:fs");
const path = require("path");


const app = express();

const PORT = 3000;
//utilizar multer como middleware

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

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

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Usar un nombre único para el archivo
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
function saveImage(file){
  console.log(file)
  return file.path;  
  
}


// Ruta para obtener todos los personajes
app.get("/api/characters", async (req, res) => {
  console.log(req, 'req')
  console.log(res, 'res')
  try {
    console.log("Intentando obtener personajes desde la base de datos...");
// Obtener parámetros de la URL
const page = parseInt(req.query.page) || 1; // Si no se proporciona el parámetro 'page', se usa el valor predeterminado 1
const pageSize = 20; // Número de personajes por página
const offset = (page - 1) * pageSize;

const characters = await Character.findAll({
  order: [['createdAt', 'DESC']],
  limit: pageSize,
  offset: offset
});
   

    if (characters.length === 0) {
      res
        .status(404)
        .json({ message: "No se encontraron personajes en la base de datos" });
    } else {
      console.log("Personajes obtenidos desde la base de datos:");
      res.json({ source: "base_de_datos", characters });
    }
  } catch (error) {
    console.error("Error al obtener personajes desde la base de datos", error);
    res.status(500).send("Error del servidor");
  }
});


// Ruta para obtener el detail de cada personaje

app.get("/api/characters/:id", async (req, res) => {

  try {
      const characterId = req.params.id

      const character = await Character.findByPk(characterId)
      if(!character){
        return res.status(404).json({message: "Personaje no encontrado"})
      }
      res.json({character})
  } catch (error) {
    console.error("Hubo un error al obtener los detalles del personaje:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }

})

// Ruta para recibir la imagen del form

app.post("/createcharacter", upload.single("image"), async (req, res) => {

  try {
 
   await saveImage(req.file);
  const ultimoID = await Character.max("id"); 

   const nuevoID = (ultimoID || 0) + 1;

    const imagePath = "/uploads/" + req.file.filename; // Definir imagePath utilizando el nombre de archivo del archivo guardado

    const nuevoPersonaje = {
      id: nuevoID,
      name: req.body.name,
      gender: req.body.gender,
      species: req.body.species,
      status: req.body.status,
      image: imagePath,
      createdAt: new Date()
    };

    const personajeCreado = await Character.create(nuevoPersonaje);

    res
      .status(201)
      .json({
        message: "Personaje creado con ID exclusivo",
        personaje: personajeCreado,
      });
  } catch (error) {
    console.error("Error al guardar la imagen en la base de datos:", error);
    res.status(500).send("Error interno del servidor");
  }
});
