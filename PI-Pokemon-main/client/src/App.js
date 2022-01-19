import './App.css';
import styled from 'styled-components';
import {Route, Routes} from 'react-router-dom'
import Landing from './pages/landing';
import Home from './pages/home';
import React,{ Fragment } from 'react';


//const Button = styled.button`
//background: whit`

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Fragment>
  );
}

export default App;
