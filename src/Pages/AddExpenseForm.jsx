import { PlusCircleIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

export default function AddExpenseForm({budgets}) {

    const fetcher = useFetcher();
    const formRef = useRef();
    const focusRef = useRef()
    const isSubmitting = fetcher.state === "submitting"

    useEffect(() => {
        if(!isSubmitting){
            //clear form
            formRef.current.reset()
            //reset focus
            focusRef.current.focus()
        }
    }, [isSubmitting])

  return (
    <div className='form-wrapper'>
        <h2 className='h3'>Add New {" "} 
            <span className='accent'>
                {
                    budgets.length === 1 && `${budgets.map(
                        (singleBudget) =>  singleBudget.name
                        
                    )}`
                }
            </span>{" "}
            Expense
        </h2>

    <fetcher.Form
        method="post"
        className='grid-sm'
        ref={formRef}
        >
         <div className='expense-inputs'>
              <div className='grid-xs'>
                      <label htmlFor="newExpense">Expense Name</label>
                      <input type="text"
                       name='newExpense'
                       id='newExpense'
                       placeholder='e.g,Coffee'
                       ref={focusRef}
                       required
                      />
              </div>

              <div className='grid-xs'>
                  <label htmlFor="newExpenseAmount">Amount</label>
                  <input type="number"
                    step="0.01"
                    inputMode='decimal'
                    required
                    name='newExpenseAmount'
                    placeholder='e.g.,₹211.25'
                  />
              </div>

         </div>

         <div className="grid-xs" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Budget Catergory</label>
             <select name="newExpenseBudget" id="newExpenseBudget"
               required
             >
                 {
                    budgets.sort((a,b) => a.createdAt - b.createdAt).map(
                        (singleBudget) => {
                            return (
                                <option key={singleBudget.id}
                                  value={singleBudget.id}
                                >   
                                    {singleBudget.name}
                                </option>
                                
                            )
                        }
                    )
                     
                 }
                 
             </select>
        </div>
        
        {/*here it helps in me to understand which form is being submitted */}
        <input type="hidden" name='_action' 
          value="createExpense"
        />
       
       <button type='submit'
                    className='btn btn--dark'
                    disabled={isSubmitting}
                  >
                   {
                    isSubmitting ? <span>Submitting...</span>:
                     <> <PlusCircleIcon width={20}/>
                    <span>Add Expense</span> </>
                   }
                    </button>

        </fetcher.Form>


    </div>
  )
}
