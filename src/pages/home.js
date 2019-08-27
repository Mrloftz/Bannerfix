import React from 'react'
import TableBanner from '../components/banner/table/tableBanner'
import { HomeLayout } from '../components/layout/home-layout'
import 'antd/dist/antd.css'
import TableAirline from '../components/airline/table/tableAirline';

class HomePage extends React.Component {
  render() {
    return (
      <HomeLayout>
        <TableBanner />
        <TableAirline />
      </HomeLayout>
    )
  }
}

export default HomePage
