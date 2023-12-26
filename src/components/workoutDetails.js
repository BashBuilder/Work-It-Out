import React from 'react'
import { useWorkoutsContext } from '../context/workContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


function WorkoutDetails({title, load, reps, createdAt, _id}) {

  const {dispatch} = useWorkoutsContext();
  const handleDelete = async () =>{
    const response = await fetch('http://localhost:4000/api/workouts/'+ _id , {
      method : 'DELETE',
    })
    const data = await response.json();
    if(response.ok){
      dispatch({type : 'DELETE_WORKOUT', payload: data})
    }
  }

  return (
    <div className="workout-details">
        <h4>{title}</h4>
        <p><strong>Load (kg) :</strong> {load}</p>
        <p><strong>Reps :</strong> {reps}</p>
        <p> {formatDistanceToNow(new Date(createdAt), {addSuffix : true})} </p>
        <span onClick={handleDelete}>Delete</span>
    </div>
  )
}

export default WorkoutDetails