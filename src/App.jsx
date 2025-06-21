import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import ExpenseContainer from './components/ExpenseContainer'

const Amount=[{amount:1000},{amount:223}]
function App() {

  return (
    <>
    <div>   
       <ExpenseContainer/>
       
    </div>
     
    </>
  )
}

export default App
