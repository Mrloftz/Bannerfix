import React from 'react'
import { Input, Radio, Button, Form, DatePicker, Upload, Icon, message, Checkbox, Modal } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import moment from 'moment'
import { DeleteBanner, Getlanguage } from '../_service/bannerMethodApi'
import { BreadCrumb } from '../components/breadcrumb'
import { Link } from 'react-router-dom'
import { HomeLayout } from './layout/home-layout'
import styled from 'styled-components'
import UploadImage from '../components/uploadImage/uploadBanner'

const dateFormat = 'YYYY-MM-DD'
let currentDate = new Date()
function getBase64(img, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.addEventListener('load', () => callback(reader.result))
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
  // const reader = new FileReader()
  // reader.addEventListener('load', () => callback(reader.result))
  // reader.readAsDataURL(img)
}
function beforeUpload(file) {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJPGorPNG) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPGorPNG && isLt2M
}
const initialState = {
  file: undefined,
  bannerImage: null,
  name: '',
  status: 0,
  link: '',
  sortOrder: '',
  startTime: null,
  endTime: null,
  loading: false,
  lastUpdate: null,
  nameError: '',
  linkError: '',
  sortOrderError: '',
  uploadErrorTH: null,
  uploadErrorENG: null,
  startTimeError: '',
  endTimeError: '',
  lang: [],
  activeLanagues: [],
  activeAllLanguages: false,
  previewVisible: false,
  languageActive: 'th',
}
class CreateBanner extends React.Component {
  state = initialState
  // valaidation hard code test
  validate = () => {
    let nameError = ''
    let linkError = ''
    let sortOrderError = ''
    let uploadErrorTH = ''
    let uploadErrorENG = ''
    let startTimeError = ''
    let endTimeError = ''
    if (!this.state.name) {
      nameError = 'Required Name'
    }
    if (!this.state.link) {
      linkError = 'Required Link'
    }
    if (!this.state.sortOrder) {
      sortOrderError = 'Required SortOrder'
    }
    if (!this.state.startTime && !this.state.endTime) {
      startTimeError = 'Required startTime'
      endTimeError = 'Required endTime'
    }
    if (!this.state.fileTH && !this.state.fileENG) {
      uploadErrorTH = 'Required Image'
      uploadErrorENG = 'Required Image'
    }
    if (nameError || linkError || sortOrderError || uploadErrorTH || uploadErrorENG || startTimeError || endTimeError) {
      this.setState({ nameError, linkError, sortOrderError, uploadErrorTH, uploadErrorENG, startTimeError, endTimeError })
      return false
    }
    return true
  }
  async componentDidMount() {
    const lang = await Getlanguage()
    this.setState({ lang: lang.data.data.language })
    const CheckParams = this.props.match.params
    if (CheckParams.id) {
      const { data } = await axios.get(`http://travizgo.dosetech.co:7788/banner/${CheckParams.id}`)
      //template string``
      this.setState({
        name: data.data.banner.name,
        link: data.data.banner.link,
        sortOrder: data.data.banner.sortOrder,
        bannerImageTH: data.data.banner.bannerTranslations[0].imageUrl,
        bannerImageENG: data.data.banner.bannerTranslations[1].imageUrl,
        status: data.data.banner.status,
        lastUpdate: moment(data.data.banner.lastUpdate, 'YYYY-MM-DD'),
        startTime: moment(data.data.banner.startTime, 'YYYY-MM-DD'),
        endTime: moment(data.data.banner.endTime, 'YYYY-MM-DD'),
      })
    }
  }
  //Input
  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  //DateTime
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }
  onStartChange = value => {
    this.onChange('startTime', value)
  }
  onEndChange = value => {
    this.onChange('endTime', value)
  }
  //Image
  handleChangeTH = info => {
    // File loading
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({ fileTH: info.file.originFileObj })
      //api upload
      let data = new FormData()
      data.append('bannerImage', info.file.originFileObj)
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      axios
        .post('http://travizgo.dosetech.co:7788/banner/uploadBannerImage', data, config)
        .then(response => {
          return response
        })
        .catch(error => {
          return error
        })
      getBase64(info.file.originFileObj, bannerImage => {
        this.setState({
          bannerImageTH: bannerImage,
          loading: false,
        })
      })
    }
  }

  handleChangeENG = info => {
    // File loading
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({ fileENG: info.file.originFileObj })
      //api upload
      let data = new FormData()
      data.append('bannerImage', info.file.originFileObj)
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      axios
        .post('http://travizgo.dosetech.co:7788/banner/uploadBannerImage', data, config)
        .then(response => {
          return response
        })
        .catch(error => {
          return error
        })
      getBase64(info.file.originFileObj, bannerImage => {
        this.setState({
          bannerImageENG: bannerImage,
          loading: false,
        })
      })
    }
  }

  //state ก็คือ Local varible ของ componentนั้นๆ
  handleSubmit = async e => {
    const isValid = this.validate()
    if (e) {
      e.preventDefault()
    }
    if (isValid) {
      alert('Your Success!')
      /// clear form
      this.setState(initialState)
    }
    const CheckParams = this.props.match.params
    if (CheckParams.id) {
      let value = {
        id: CheckParams,
        name: this.state.name,
        status: this.state.status,
        link: this.state.link,
        startTime: moment(this.state.startTime).format('YYYY-MM-DD'),
        endTime: moment(this.state.endTime).format('YYYY-MM-DD'),
        sortOrder: this.state.sortOrder,
        bannerTranslations: [
          {
            id: 3,
            languageId: 2,
            imageUrl: '',
          },
          {
            id: 4,
            languageId: 5,
            imageUrl: '',
          },
        ],
      }
      await axios
        .post('http://travizgo.dosetech.co:7788/banner/update', value)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      let data = {
        name: this.state.name,
        status: this.state.status,
        link: this.state.link,
        startTime: moment(this.state.startTime).format('YYYY-MM-DD'),
        endTime: moment(this.state.endTime).format('YYYY-MM-DD'),
        sortOrder: this.state.sortOrder,
        bannerTranslations: [
          {
            languageId: 2,
            imageUrl: this.state.bannerImageENG,
          },
          {
            languageId: 5,
            imageUrl: this.state.bannerImageTH,
          },
        ],
      }
      await axios
        .post('http://travizgo.dosetech.co:7788/banner/create', data)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  async saveAndExit() {
    // alert('Your Success!')
    await this.handleSubmit()
    //change Location
    this.props.history.push('/')
  }

  onChangeCheckbox = checkedValues => {
    this.setState({ activeLanagues: checkedValues })
  }

  setActiveAllLanguages = e => {
    this.setState({ activeAllLanguages: e.target.checked })

    if (e.target.checked) {
      this.setState({ languageActive: 'th' })
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div>Add Image</div>
      </div>
    )
    const { startTime, endTime } = this.state
    const { bannerImageENG, bannerImageTH, previewVisible } = this.state
    const CheckParams = this.props.match.params
    return (
      <div>
        <HomeLayout>
          <Container>
            {/* comment ไว้หน่อย back end get api*/}
            {this.state.lang.map((value, index) => {
              return (
                <LanguageButton
                  isActive={this.state.languageActive === value.code}
                  onClick={() => this.setState({ languageActive: !this.state.activeAllLanguages ? value.code : 'th' })}
                  key={index}
                >
                  {value.code}
                </LanguageButton>
              )
            })}
            <div>
              <Form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
                <h1>Banner</h1>
                {CheckParams.id && (
                  <label style={{ float: 'right' }}>
                    LastUpdate
                    <p>{moment(this.state.lastUpdate).format('YYYY-MM-DD')}</p>
                  </label>
                )}
                <BreadCrumb />
                {!CheckParams.id && <h1>Create</h1>}
                {CheckParams.id && <h1>Edit</h1>}
                <Checkbox onChange={this.setActiveAllLanguages} value={this.state.activeAllLanguages}>
                  ใช้เหมือนกันทุกภาษา
                </Checkbox>
                <div>
                  <p style={{ marginTop: '1rem' }}>
                    Name
                    <Required>*</Required>
                  </p>
                  <Input
                    type="text"
                    style={{ width: '40%' }}
                    name="name"
                    placeholder="Enter Your Title"
                    value={this.state.name}
                    onChange={this.handleChangeInput}
                  />
                  <div style={{ fontSize: 12, color: 'red' }}>{this.state.nameError}</div>
                </div>
                <div>
                  <p style={{ marginTop: '1rem' }}>
                    URL
                    <Required>*</Required>
                  </p>
                  <Input
                    type="text"
                    name="link"
                    style={{ width: '40%' }}
                    placeholder="Enter Your URL"
                    value={this.state.link}
                    onChange={this.handleChangeInput}
                  />
                  <div style={{ fontSize: 12, color: 'red' }}>{this.state.linkError}</div>
                </div>
                <div>
                  <p style={{ marginTop: '1rem' }}>
                    Sort Order<Required>*</Required>
                  </p>
                  <Input
                    type="text"
                    name="sortOrder"
                    style={{ width: '40%' }}
                    placeholder="Enter Your SortOrder"
                    value={this.state.sortOrder}
                    onChange={this.handleChangeInput}
                  />
                  <div style={{ fontSize: 12, color: 'red' }}>{this.state.sortOrderError}</div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <div>
                    <p>
                      Start Datetime<Required>*</Required>
                    </p>
                    <DatePicker
                      name="startTime"
                      selected={this.state.startTime}
                      value={startTime}
                      onChange={this.onStartChange}
                      defaultValue={moment(currentDate, dateFormat)}
                      format={dateFormat}
                    />
                    <div style={{ fontSize: 12, color: 'red' }}>{this.state.startTimeError}</div>
                  </div>
                  <div>
                    <p style={{ marginTop: '1rem' }}>
                      End Datetime<Required>*</Required>
                    </p>
                    <DatePicker
                      name="endTime"
                      selected={this.state.endTime}
                      value={endTime}
                      onChange={this.onEndChange}
                      defaultValue={moment(currentDate, dateFormat)}
                      format={dateFormat}
                    />
                    <div style={{ fontSize: 12, color: 'red' }}>{this.state.endTimeError}</div>
                  </div>
                </div>

                {this.state.languageActive === 'th' && (
                  <div style={{ marginTop: '1rem' }}>
                    Thumbnail<label>(TH)</label>
                    <Required>*</Required>
                    <UploadImage />
                    <Upload
                      name="bannerImage"
                      type="file"
                      listType="picture-card"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      value={this.state.bannerImageTH}
                      onChange={this.handleChangeTH}
                    >
                      <div>{bannerImageTH ? <img src={bannerImageTH} alt="avatar" style={{ width: '100%' }} /> : uploadButton}</div>
                    </Upload>
                    <Modal visible={previewVisible} footer={null}>
                      <img alt="example" style={{ width: '100%' }} src={bannerImageTH} />
                    </Modal>
                    (max 2MB)<Required>*</Required>
                    <div style={{ fontSize: 12, color: 'red' }}>{this.state.uploadErrorTH}</div>
                  </div>
                )}

                {this.state.languageActive === 'en' && (
                  <div style={{ marginTop: '1rem' }}>
                    Thumbnail<label>(ENG)</label>
                    <Required>*</Required>
                    <Upload
                      name="bannerImage"
                      type="file"
                      listType="picture-card"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      value={this.state.bannerImageENG}
                      onChange={this.handleChangeENG}
                    >
                      <div>{bannerImageENG ? <img src={bannerImageENG} alt="" style={{ width: '100%' }} /> : uploadButton}</div>
                    </Upload>
                    (max 2MB)<Required>*</Required>
                    <div style={{ fontSize: 12, color: 'red' }}>{this.state.uploadErrorENG}</div>
                  </div>
                )}
                <p style={{ marginTop: '1rem' }}>
                  Status<Required>*</Required>
                </p>
                <Radio.Group name="status" value={this.state.status} onChange={this.handleChangeInput}>
                  <Radio value={0}>enable</Radio>
                  <Radio value={1}>disable</Radio>
                </Radio.Group>
                <div style={{ display: 'flex', marginTop: '1rem' }}>
                  <Button type="danger" onClick={() => DeleteBanner(CheckParams.id)}>
                    Remove
                  </Button>
                  <Link to="/">
                    <Button type="danger">Cancel</Button>
                  </Link>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button type="primary" htmlType="button" onClick={() => this.saveAndExit()}>
                    Save & Exit
                  </Button>
                </div>
              </Form>
            </div>
          </Container>
        </HomeLayout>
      </div>
    )
  }
}
const Container = styled.div`
  background: #d6f4fd;
  padding: 2rem;
`
const Required = styled.span`
  color: red;
`
const LanguageButton = styled.button`
  background-color: ${props => (props.isActive ? '#007bff' : '#D7D8DC')};
  color: white;
  float: right;
  cursor: poniter;
`
export default CreateBanner
