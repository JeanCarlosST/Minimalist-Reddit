import React, { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from '../components/root';
import Home from '../features/Home/Home';
import Subreddit from '../features/Subreddit/Subreddit';
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <Root/> }>
      <Route index element={ <Home/> }/>
      <Route path='r/:name/' element={ <Subreddit/> }/>
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={ router } />
  )
}

export default App;
