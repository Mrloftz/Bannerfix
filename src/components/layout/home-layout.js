import React from 'react'
// import Footer from '../footer/footer'
import Header from '../header/header'

export const HomeLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      {/* <Footer /> */}
    </React.Fragment>
  )
}
