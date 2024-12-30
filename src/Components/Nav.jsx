import React from 'react'
//assets import logo img
import logo from '../assets/logomark.svg'
import { Form, NavLink } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/16/solid';

export default function Nav({userName}) {
  return (
    <nav>
        <NavLink
           to="/"
           aria-label='Go to home'
        >
              <img src={logo} alt="" height={30}/>
              <span>HomeBudget</span>
        </NavLink>

        {
            userName && (
                <Form
                 method='post'
                 action='/logout'

                 onSubmit={ (event) => {
                    if( !confirm("Delete user and all data?") ){
                        event.preventDefault();
                    }
                }}
                 >
                    <button type='submit'
                    className='btn btn--warning'
                   
                    >
                         <span>Delete User</span>
                         <TrashIcon  width={20} />
                    </button>
                     
                </Form>
            )
        }

    </nav>
  )
}
