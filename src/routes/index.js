import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from '../pages/home'
import BannerPage from '../pages/banner'

const Routing = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/banner" component={BannerPage} />
      <Route exact path="/banner/:id" component={BannerPage} />
    </BrowserRouter>
  )
}

export default Routing
