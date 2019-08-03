import React from 'react'
import { BannerComponent } from '../components/createBanner'
import { HomeLayout } from '../components/layout/home-layout'

class BannerPage extends React.Component {
  render() {
    return (
      <HomeLayout>
        <BannerComponent />
      </HomeLayout>
    )
  }
}

export default BannerPage
