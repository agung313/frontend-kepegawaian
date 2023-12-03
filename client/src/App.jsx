import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HomeBase } from './pages/HomeBase'
import HomeAdmin from './pages/HomeAdmin'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeBase/>}/>
                <Route path='/admin' element={<HomeAdmin/>}/>
            </Routes>
        </Router>
    )
}

export default App