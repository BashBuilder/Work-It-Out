import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../context/workContext'

function WorkoutForm() {

  const {dispatch} = useWorkoutsContext();
  const [details, setDetails] = useState({
    title: "", load : "", reps : ""
  })
  const [error , setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setDetails(prevDetails => {
      return({
        ...prevDetails, [name] : value
      })
      console.log(details)
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(details)

    const response = await fetch("http://localhost:4000/api/workouts", {
      method : "POST",
      body : JSON.stringify(details),
      headers : {
        "Content-Type" : "application/json",
      }
    })
    const data = await response.json()
    if(!response.ok){
      setError(data.err)
      setEmptyFields(data.emptyFields)
      
    } if (response.ok){
      setError(null)
      setEmptyFields([])
      setDetails({
        title: "", load : "", reps : ""
      })
      dispatch({type: 'CREATE_WORKOUT', payload: data})
    }
  }


  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label htmlFor="title">Exercise Title</label>
      <input 
        type="text"
        name='title' 
        onChange={handleChange}
        value = {details.title}
        className={emptyFields.includes('title')? "error" : ""}
      />
      <label htmlFor="title">Load in (Kg)</label>
      <input 
        type="number"
        name='load' 
        onChange={handleChange}
        value = {details.load}
        className={emptyFields.includes('load')? "error" : ""}
      />
      <label htmlFor="title">Number of Reps</label>
      <input 
        type="text"
        name='reps' 
        onChange={handleChange}
        value = {details.reps}
        className={emptyFields.includes('reps')? "error" : ""}
      />
      <button>Add workout</button>
      {error && <div className='error'>
          {error}
        </div>}
    </form>
  )
}

export default WorkoutForm