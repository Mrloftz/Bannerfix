import React from 'react'
import TableBanner from '../components/tableBanner'
import { HomeLayout } from '../components/layout/home-layout'
import 'antd/dist/antd.css'

class HomePage extends React.Component {
  render() {
    return (
      <HomeLayout>
        <TableBanner />
      </HomeLayout>
    )
  }
}

export default HomePage
