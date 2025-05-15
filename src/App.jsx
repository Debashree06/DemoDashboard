import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DefaultLayout from './components/layouts/DefaultLayout'
import AllRoutes from './Routes/Routes'

function App() {
  return (
    <DefaultLayout>
      <AllRoutes/>
    </DefaultLayout>
  )
}

export default App
