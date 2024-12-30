import Dashboard, { dashBoardAction, dashBoardLoader } from "./Pages/Dashboard"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { mainLoader } from "./Layout/Main";
import Error from "./Pages/Error";
import Main from "./Layout/Main";
import {logoutAction} from './Action/Logout'
import { Toaster } from "react-hot-toast";
import ExpensePage, { expenseAction, expenseLoader } from "./Pages/ExpensePage";
import BudgetPage, { budgetAction, budgetLoader } from "./Pages/BudgetPage";



function App() {
 
   const router = createBrowserRouter(
      [
         {
            path:"/",
            element: <Main/> ,
            loader: mainLoader, //setp-2 
            errorElement: <Error/>,
            children: [
               {   index:true,
                   element: <Dashboard/> ,
                   action: dashBoardAction,
                   loader: dashBoardLoader, //setp-2 
                   errorElement: <Error/>,
                  
                   
               },
               {   path:"expenses",
                   element: <ExpensePage/> ,
                   loader: expenseLoader,
                   action: expenseAction, 
                   errorElement: <Error/>,
               },
               {   path:"budget/:id", //:id represents dynamic variable is passing
                   element: <BudgetPage/> ,
                   loader: budgetLoader,
                   action: budgetAction ,
                   errorElement: <Error/>
                  
               },
               {
                  path:"logout",
                  action: logoutAction
               }
            ]

         }
      ]
   )

  return (
     <div className='App' >
         <Toaster/>
          <RouterProvider  router={router} />
     </div>
  )
}

export default App
