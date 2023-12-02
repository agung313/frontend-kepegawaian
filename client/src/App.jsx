import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HomeBase } from './pages/HomeBase'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeBase/>}/>
            </Routes>
        </Router>
    )
}

export default App