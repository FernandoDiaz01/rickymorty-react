import React, { useState } from 'react'
import './CreateCharacterForm.css'


export const CreateCharacterForm = () => {

  const [characterData, setCharacterData] = useState({
    name:'',
    gender:'',
    species:'',
    status:'',
    image:''
  })

  const handleChange = (e) =>{
    setCharacterData({
      ...characterData,
      [e.target.name] : e.target.value
    })
  }

const handleSubmit = async (e) =>{
  e.preventDefault()
}



  return (
    <div className="container-all">
    <div className='container-form'>
      <form onSubmit={handleSubmit}>
      <label >Image:
          <input type="text" name='name' value={characterData.image} onChange={handleChange} />
        </label>
        <label >Nombre:
          <input type="text" name='name' value={characterData.name} onChange={handleChange} />
        </label>
        <label >Gender:
          <input type="text" name='gender' value={characterData.gender} onChange={handleChange} />
        </label>
        <label >Species:
          <input type="text" name='species' value={characterData.species} onChange={handleChange}  />
        </label>
        <label >Status:
          <input type="text" name='status' value={characterData.status} onChange={handleChange} />
        </label>
        <button type="submit">Create Character</button>
      </form>
    </div>
    </div>
  )
}
