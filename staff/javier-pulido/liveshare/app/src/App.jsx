import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './index.css'

function App() {
    const [count, setCount] = useState(0)
    return (

        <>
            {/* <Home/> */}
            {/* <Login/> */}
            <Register/>
        </>
    )
}

export default App
