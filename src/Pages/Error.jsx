import {  ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'

export default function Error() {
 
    const error = useRouteError()
    const navigate = useNavigate()

  return (
    <div className='error'>
        <h1>Sorry! We've got a problem</h1>
        <p> { error.message || error.statusText } </p>
        <div className='flex-md'>
            <button className='btn btn--dark'
              onClick={() => navigate(-1)}
            >
                    <ArrowUturnLeftIcon/>
                    <span>Go Back</span>
            </button>

            <Link to="/" className='btn btn--dark' >
                  <HomeIcon/>
                  <span>Go Home</span>
            </Link>

        </div>
    </div>
  )
}
