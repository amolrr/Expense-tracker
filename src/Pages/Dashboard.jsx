import React from 'react'
import {  Link, useLoaderData } from 'react-router-dom'
import { createBudget, createExpense, deleteExpenseItem, fetchData, wait } from '../Components/Helpers';
import Intro from '../Components/Intro';
import toast from 'react-hot-toast';
import { AddBudgetForm } from './AddBudgetForm';
import AddExpenseForm from './AddExpenseForm';
import { BudgetItem } from '../Components/BudgetItem';
import Table from '../Components/Table';


//loader function step-1
export function dashBoardLoader(){
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets , expenses};
}

/* dahBoardForm ka kam sirf form ke ander ka data retive karna hai */
//action //here getting data from the browser local storage 
// request.formData works as an API which get data from local storage of browser
export async function dashBoardAction({ request }){
 
  await wait();

    //Retrive the form data from request 
    const data = await request.formData();

    //converting the formData object into plain javascript object
    const { _action , ...formData } = Object.fromEntries(data)

    //console the form Data
    console.log(_action, "this is formData")

  //new User -> getting it on the basis passsword
  if( _action === "newUser" ){

     try {
     //setting the key-userName and its value formData.userName 
     //in the local storage and making sure that it is in the form of string 
       localStorage.setItem("userName", 
        JSON.stringify(formData.userName))

        return  toast.success(`Welcome ${formData.userName}`)
   } catch ( error ) {
      throw new Error("There is a problem creating your account");
      
   }
  }

  //create Budget
  if(_action === "createBudget"){

    try {
           createBudget({
            name: formData.newBudget,
            amount: formData.newBudgetAmount
           })

           return toast.success("Budget Created")
    } catch (error) {
        throw new Error("There was a problem fetching the budget data");
        
    }
  }

  //create Expense
  if(_action === "createExpense"){
    try {    
            createExpense( { 
              name:formData.newExpense,
              amount:formData.newExpenseAmount,
              budgetId:formData.newExpenseBudget
               })
            return toast.success(`Expense ${formData.newExpense} Created!`)
    } catch (error) {
      throw new Error("There was a problem fetching the budget data");
        
    }
  }
  
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

export default function Dashboard() {
  const { userName , budgets , expenses } = useLoaderData(); //step-3

  return (
    <>
      {
        userName ? 
        <div className='dashboard'>
              <h1>Welcome back,
                <span  className='accent'
                >{userName} </span>
              </h1>
              
              <div className='grid-sm'>
                    {
                      budgets && budgets.length > 0 ?
                    ( <div className="grid-lg">
                            <div className="flex-lg">
                               <AddBudgetForm/>
                               <AddExpenseForm budgets={ budgets } />
                            </div>
                            <h2>Exisiting Budgets</h2>
                            <div  className='budgets'>
                             
                                {

                                  budgets.map( (budget) => (
                                    <BudgetItem key={budget.id} 
                                    budget={ budget } />
                                   ) )

                                }
                            </div>
                            {
                              expenses && expenses.length > 0
                              && (
                                  <div className='grid-md'>
                                        <h2>Recent Expenses</h2>
                                        <Table expenses={expenses.sort(
                                          (a,b) => (b.createdAt - a.createdAt)
                                          
                                        ).slice(0,8) } />
                                        {
                                          expenses.length > 8 && (
                                            <Link
                                            to="expenses"
                                             className='btn btn--dark'
                                            >
                                                   View all expeses
                                            </Link>
                                          )
                                        }
                                  </div>
                              )
                            }
                     </div>)
                     :
                     
                     (<div className="grid-sm">
                          <p>Personal budgeting is the 
                            secret to financial freedom.
                          </p>
                          <p>Create a budget to get started!</p>
                            <div className="flex-lg">
                               <AddBudgetForm/>
                               
                            </div>
                     </div>)
                     
                     }
              </div>
        </div>
        : <Intro/>
      }
      
    </>
  )
}
