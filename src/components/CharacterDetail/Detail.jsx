import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"



export const Detail = () => {

  const [characterDetail, setCharacterDetail] = useState([]);

  let id = useParams()
  console.log(id)

  
  useEffect(() => {
    const getCharactersDetail = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${id}`
        );
        console.log(response.url)
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del personaje');
        }
        const data = await response.json();
        setCharacterDetail(data);
      } catch (error) {
        console.error('Hubo un error:', error);
      
      }
    };
  
    getCharactersDetail();
    console.log(characterDetail);
  }, []);
  

  return (
    <div>
        <h1>
            Fer detalle 
        </h1>
       
    </div>
  )
}
