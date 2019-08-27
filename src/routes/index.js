import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from '../pages/home'
import BannerPage from '../pages/banner'
import AirlinePage from '../pages/airline';

const Routing = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/banner" component={BannerPage} />
      <Route exact path="/banner/:id" component={BannerPage} />
      <Route exact path="/airline" component={AirlinePage} />
      <Route exact path="/airline/:id" component={AirlinePage} />
    </BrowserRouter>
  )
}

export default Routing
