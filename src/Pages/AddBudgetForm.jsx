import { CurrencyRupeeIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useRef } from 'react'
import { Form , useFetcher } from 'react-router-dom'

export const AddBudgetForm = () => {

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef()
  const focusRef = useRef()

  useEffect( () =>{
    if(!isSubmitting){
        formRef.current.reset()
        focusRef.current.focus()
    }
  }, [isSubmitting] )

  return (
    <div className='form-wrapper'>
          <h2 className='h3'>
            Create Budget
          </h2>

          <fetcher.Form
            method='post'
            className='grid-sm'
            ref={formRef}
          >
              <div className='grid-xs'>
                  <label htmlFor="newBudget">   
                  </label>
                  <input type="text"name="newBudget" id='newBudget'
                   placeholder='e.g.,Groceries'
                   required
                   ref={focusRef}
                  />
                </div> 

                <div className='grid-xs'> 
                     <label htmlFor="newBudgetAmount">Amount</label>
                     <input type="number"
                       step="0.01"
                       name='newBudgetAmount'
                       id='newBudgetAmount'
                       placeholder='e.g.,₹210'
                       required
                       inputMode='decimal'
                       
                     />
                  </div> 
                  
                   {/*here it helps in me to understand which form is being submitted */}
                  <input type="hidden" name='_action' value="createBudget" />

                  <button type='submit'
                    className='btn btn--dark'
                    disabled={isSubmitting}
                  >
                   {
                    isSubmitting ? <span>Submitting...</span>: <> <CurrencyRupeeIcon width={20}/>
                    <span>Create Budget</span> </>
                   }
                    </button>
          </fetcher.Form>
    </div>
  )
}
