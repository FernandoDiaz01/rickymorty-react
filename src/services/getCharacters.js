// eslint-disable-next-line no-undef
import axios from 'axios'



export const getCharacters = async () => {

  try {
    const response = await axios.get('http://localhost:3000/api/characters',{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    });
    const data = await response.data;
    console.log('Datos obtenidos desde el servidor:', data);
    return data.characters;
  } catch (error) {
    console.error('Error al obtener datos desde el back-end', error);
    throw error;
  }
};
getCharacters();



