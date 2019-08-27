import React from 'react'

import { HomeLayout } from '../components/layout/home-layout'
import { AirlineComponent } from '../components/airline/createAirline';

class AirlinePage extends React.Component {
  render() {
    const params = this.props.match.params

    const { history } = this.props
    return (
      <HomeLayout>
        <AirlineComponent params={params} history={history} />
      </HomeLayout>
    )
  }
}

export default AirlinePage
