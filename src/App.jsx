import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import LongdistanceSchool from '@/pages/LongdistancePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home />}/>
        <Route path='/zonasi' element={ <LongdistanceSchool /> }/>
      </Routes>
    </Router>
  )
}

export default App