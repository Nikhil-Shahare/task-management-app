import React from 'react'
import { useTasks } from '../context/AuthContext';

const Home = () => {
    const tasks = useTasks();
    console.log("this are task in home",tasks)
  return (
    <div className='bg-red-500'>Home</div>
  )
}

export default Home