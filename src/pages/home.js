import React from 'react'
import { Layout } from 'antd'
import { HomeLayout } from '../components/layout/home-layout'
import 'antd/dist/antd.css'
import TableBanner from '../components/tableBanner'

class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <HomeLayout>
          <TableBanner />
        </HomeLayout>
      </Layout>
    )
  }
}

export default HomePage
