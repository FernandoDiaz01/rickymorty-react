const axios = require('axios')
const Character = require('../models/CharacterModel.cjs')
const sequelize = require('./dbase.cjs')


async function callDataFromAPI() {
    let allCharacters = [];
    let url = 'https://rickandmortyapi.com/api/character';
  
    try {
      do {
        const response = await axios.get(url);
  
        // Verificar si 'results' está presente en la respuesta
        if (response.data && response.data.results) {
          const charactersData = response.data.results;
          allCharacters = allCharacters.concat(charactersData);
          url = response.data.info ? response.data.info.next : null;
        } else {
          // Si 'results' no está presente, salir del bucle
          url = null;
        }
      } while (url);
  
      return allCharacters;
    } catch (error) {
      console.error('Error al llamar a la API', error.message);
      throw error;
    }
  }

async function fillDatabase(){
    try {
        await sequelize.sync({force:true})

        //tomando los datos de la api

        const allCharactersData = await callDataFromAPI();

        // crear el registro en la tabla character con los datos de la api
        await Character.bulkCreate(allCharactersData)
        console.log('Base de datos llenada correctamente')
    } catch (error) {
        console.error('Error al llenar la base de datos', error);

    } finally{
        await sequelize.close()
    }
}

fillDatabase()


