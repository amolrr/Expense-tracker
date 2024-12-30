
export const wait = () => new Promise(res =>
    setTimeout(res, Math.random() * 1000)
) 



// color is set by calculating the hue value , saturation and lightness
const generateRandomColor = () => {
    // geeting the length of budgets 
    const existingBudgetsLength = 
    fetchData("budgets")?. length ?? 0;
    return `${existingBudgetsLength * 34} 65% 50%`
}



//local storage 
export const fetchData = (key) => {
     return JSON.parse(localStorage.getItem(key));
     
}

//get all items form the locale storage
export const getAllMatchingItems = ({category, key , value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value )
}

//delete items from local storage
export const deleteExpenseItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}


//create Budget
export const createBudget = ({name , amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name:name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", 
        JSON.stringify([...existingBudgets, newItem ]) );
}


// creating expenses
export const createExpense = ({name , amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name:name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }

    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", 
        JSON.stringify([...existingExpenses, newItem ]) );
}



//delete item 
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key);
}


//total spent by budget
export const calculateSpentByBudget = (budgetId) =>{
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) =>{
        //check if the expense.id === budget.id that i have passed
        if(expense.budgetId !== budgetId) return acc

        //add the current amount to my total
        return acc += expense.amount
    }, 0 ) //this 0 is assigned to acc  !
    return budgetSpent;
}

//format percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractiondigits: 0
    })
}

//formating currency
export const formatCurrency = (amt) => {
   return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR"
   }) 
}

//format date
export const formatDateToLocaleString =
 ( epoch ) =>  new Date( epoch ).toLocaleString();


