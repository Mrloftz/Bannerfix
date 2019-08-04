import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
class CreatePageBanner extends React.Component {
  render() {
    return (
      <Link to="/banner">
        <Button style={{ float: 'right' }} type="primary">
          Create New
        </Button>
      </Link>
    )
  }
}

export default CreatePageBanner
