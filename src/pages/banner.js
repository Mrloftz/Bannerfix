import React from 'react'
import { BannerComponent } from '../components/createBanner'
import { HomeLayout } from '../components/layout/home-layout'

class BannerPage extends React.Component {
  render() {
    const params = this.props.match.params

    const { history } = this.props
    return (
      <HomeLayout>
        <BannerComponent params={params} history={history} />
      </HomeLayout>
    )
  }
}

export default BannerPage
