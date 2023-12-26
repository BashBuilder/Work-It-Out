import React from 'react'
import { useState, useEffect } from 'react'
import WorkoutDetails from '../components/workoutDetails';
import WorkoutForm from '../components/workoutForm';
import { useWorkoutsContext } from '../context/workContext';


function Home() {
  // const [workouts, setWorkouts] = useState(null);

  const {workouts, dispatch} = useWorkoutsContext();



  const fetchWorkouts = async () =>{
    const response = await fetch("http://localhost:4000/api/workouts", {
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }
    })
    const data = await response.json()
    dispatch({type : 'SET_WORKOUTS', payload : data})
  }

  useEffect(()=>{
    fetchWorkouts();
  }, [])


  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map(workout =>{
          return (
            <WorkoutDetails key={workout._id} {...workout} />
          )
        })}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home