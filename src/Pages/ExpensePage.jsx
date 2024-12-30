import React from 'react'
import { deleteExpenseItem, fetchData, wait } from '../Components/Helpers';
import { useLoaderData } from 'react-router-dom';
import Table from '../Components/Table';
import toast from 'react-hot-toast';

//loader function 
export async function expenseLoader(){
    const expenses = await fetchData("expenses");
    return { expenses };
  }

//action to delete expenses from ExpensePage
export async  function expenseAction({request}){
   
    await wait();

    //Retrive the form data from request 
    const data = await request.formData();

    //converting the formData object into plain javascript object
    const { _action , ...formData } = Object.fromEntries(data)

    //console the form Data
    console.log(_action, "this is formData of ExpensePage")

        //expense delete
        if(_action === "deleteExpense"){
            try {    
                     deleteExpenseItem({
                      key:"expenses",
                      id:formData.expenseId
                     })
                    return toast.success(`Expense deleted!`)
            } catch (error) {
              throw new Error("There was a problem deleting your expense data");
                
            }
          }
}


const ExpensePage = () => {

    const { expenses } = useLoaderData();

  return (
    <div className='grid-lg'>
       
         <h1>All Expenses</h1>
          {
             expenses && expenses.length > 0 ? (
                <div className='grid-md'>
                <h2>Recent Expenses
                    <small> ({expenses.length}, total) </small>
                </h2>
                <Table  expenses={expenses} />
             </div>
             ): (
                <p>No Expenses to show</p>
             )
          }
    </div>
  )
}

export default ExpensePage
