// eslint-disable-next-line no-undef
import axios from 'axios'



export const getCharacters = async (pageNum) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/characters?page=${pageNum}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const data = response.data;
    console.log('Datos obtenidos desde el servidor:', data);

     return data.characters
  } catch (error) {
    console.error('Error al obtener datos desde el back-end', error);
    throw error;
  }
};
getCharacters();



