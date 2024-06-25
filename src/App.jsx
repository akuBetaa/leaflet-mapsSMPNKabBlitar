import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Maps from '@/components/Maps';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Maps />}/>
      </Routes>
    </Router>
  )
}

export default App