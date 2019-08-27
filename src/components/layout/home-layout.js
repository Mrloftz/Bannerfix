import React from 'react'
import Header from '../header/header'
import SideBar from '../sidebar/sidebar';

export const HomeLayout  = ({ children }) => {

  return (
    <React.Fragment>
      <Header />           
      {/* <SideBar/> */}
      {children}
    </React.Fragment>
  )
}
