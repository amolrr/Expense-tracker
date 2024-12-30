import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import { fetchData } from '../Components/Helpers';

//assets import
import wave from '../assets/wave.svg'
import Nav from '../Components/Nav';

//loader function step-1
export function mainLoader(){
  const userName = fetchData("userName");
  return { userName };
}

export default function Main() {
  const { userName } = useLoaderData(); //step-3

  return (
    <div  className='layout' >
      <Nav  userName={userName} />
       <main> <Outlet/> </main>
       <img src={wave} alt="" />
    </div>
  )
}
