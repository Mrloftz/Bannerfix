import React, { Component } from 'react'
import axios from 'axios'

class UploadImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
    }
  }
  handleSubmit = e => {
    e.preventDefault()
  }
  handleImageChangeTH = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onload = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      })
    }
    reader.readAsDataURL(file)
    // e.preventDefault()
  }
  render() {
    let { imagePreviewUrl } = this.state
    if (imagePreviewUrl) {
      imagePreviewUrl = <img alt="" style={{ width: '25%' }} src={imagePreviewUrl} />
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleImageChangeTH} />
        </form>
        {imagePreviewUrl}
      </div>
    )
  }
}

export default UploadImage
