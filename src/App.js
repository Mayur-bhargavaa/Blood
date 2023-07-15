import React from 'react';
import SignupForm from './client/SignupForm';
import LoginForm from './client/LoginForm';
import { BrowserRouter, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import Home from "./client/home";
import ViewBloodbank from "./client/viewblooddata";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/login" element={<LoginForm/>}/>
    <Route path="/viewBloodbank" element={<ViewBloodbank/>}/>
    </Routes>
    </BrowserRouter>
   
  );
};

export default App;
