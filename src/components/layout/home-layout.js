import React from 'react'
import Header from '../header/header'

export const HomeLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}
