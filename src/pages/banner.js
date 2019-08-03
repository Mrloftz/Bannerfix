import React from 'react'
import CreateBanner from '../components/createBanner'
import { HomeLayout } from '../components/layout/home-layout'
import { Layout } from 'antd'
class BannerPage extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Layout> <HomeLayout>
          <CreateBanner />
        </HomeLayout></Layout>

      </div>
    )
  }
}

export default BannerPage

//page => combine every COMPONENT which is used in page path
//component => a piece of element
