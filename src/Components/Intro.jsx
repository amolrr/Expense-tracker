import { UserPlusIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Form } from 'react-router-dom'
import image from '../assets/illustration.jpg'

export default function Intro() {
  return (
    <div className='intro' >
          <div>
          <h1>
            Take Control of <span className='accent'> Your Money</span>
          </h1>

          <p>
            Personal budgeting is the secret to financial freedom.
            Start your journey today.
          </p>

          <Form
          method="post"
          >

            <input type="text" 
             name='userName'
             placeholder='Enter your name'
             required
             aria-label='Your Name'
             autoComplete='given-name'
            />  
          
          <input type="hidden" name='_action'value="newUser" />
          <input type="password" 
             name='password'
             placeholder='Enter your password'
             required
             aria-label='Your Name'
             autoComplete='given-name'
            />  

            <button  type='submit'
            className='btn btn--dark'
            >
                <span> Create Account</span>
                <UserPlusIcon width={20}/>
               </button> 
          </Form>
          </div>

          <img src={image} alt="Person with money" />
    </div>
  )
}
