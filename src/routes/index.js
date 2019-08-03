import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from '../pages/home'
import CreateBanner from '../components/createBanner'

const Routing = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/banner" component={CreateBanner} />
      <Route exact path="/banner/:id" component={CreateBanner} />
    </BrowserRouter>
  )
}

export default Routing
