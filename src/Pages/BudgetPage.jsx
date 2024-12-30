import React from "react";
import { createExpense, deleteExpenseItem, getAllMatchingItems, wait } from "../Components/Helpers";
import { useLoaderData } from "react-router-dom";
import { BudgetItem } from "../Components/BudgetItem";
import AddExpenseForm from "./AddExpenseForm";
import Table from "../Components/Table";
import toast from "react-hot-toast";

//loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0]; //[0] represents the 0th index element simple!

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The Budget you're trying to find doesn't exist");
  }

  return { budget, expenses };
}


//action to delete expenses from ExpensePage
export async  function budgetAction({request}){
   
    await wait();

    //Retrive the form data from request 
    const data = await request.formData();

    //converting the formData object into plain javascript object
    const { _action , ...formData } = Object.fromEntries(data)

    //console the form Data
    console.log(_action, "this is formData of budgetPage")

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
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg"
      style={{
        "--accent": budget.color
      }}
    >
      <h1 className="h2">
        <span className="accent"> {budget.name} </span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name} </span>
            Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
