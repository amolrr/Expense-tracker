import React from 'react'
import { formatCurrency , formatDateToLocaleString , getAllMatchingItems } from './Helpers'
import { Link, useFetcher } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/16/solid';

const ExpenseItem = ({expense, showBudget=true }) => {
    const budget = getAllMatchingItems({
        category:"budgets",
        key: "id",
        value: expense.budgetId
    })[0]; //[0] represents the 0th index element simple!
    // console.log(budget, "budget leleo")

    const fetcher = useFetcher();

  return (
    <>   
         <td>  {expense.name} </td>
         <td> {formatCurrency(expense.amount)} </td>
         <td> { formatDateToLocaleString( expense.createdAt) } </td>
        { 
            showBudget &&
            ( <td> 
            <Link
            to={`/budget/${budget.id}`}
            style={{
                "--accent": budget.color
            }}
            > 
            {
              budget.name   
            } </Link> </td>
            
          )}

            <td>
                    <fetcher.Form
                    method='post'
                    >
                        {/* { //these input fileds helps me to understand the which expense should be 
                        // deleted based on there expeseId and once form submitted then i will get  
                        which expense should delete with the help of name and value } */}
                         <input type="hidden" name='_action'
                         value="deleteExpense" />
                         <input type="hidden" name='expenseId'
                          value={expense.id}
                          />

                        <button type='submit'
                        className='btn btn--warning'
                        aria-label={`Delete ${expense.name} expense`}
                        >    
                            <TrashIcon width={20}/> </button>
                    </fetcher.Form>
            </td>
    </>
  )
}

export default ExpenseItem
