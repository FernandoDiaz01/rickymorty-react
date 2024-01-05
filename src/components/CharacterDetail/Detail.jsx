import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"



export const Detail = ({gender, species, origin,location}) => {

  const [characterDetail, setCharacterDetail] = useState({});

  let {id} = useParams()
  console.log(id)

  
  useEffect(() => {
    const getCharactersDetail = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        
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
  }, [id]);
  

  return (
    <div>
        <h1>
          Detalles del Personaje
        </h1>
        {characterDetail && (
          <ul className="character_detail_info">
            <li>Gender:{gender} </li> 

          </ul>
        )}
       
       
    </div>
  )
}
