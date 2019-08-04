import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import { FieldInput, FieldInputDatePicker, FieldCheckboxInput, FieldFileInput, FieldRadioInput } from '../components/input'
import { Button } from 'antd'
import { LoginSchema } from '../helper/validator'
import * as moment from 'moment'
import styled from 'styled-components'
import { UploadBanner, Getlanguage, GetBanner, DeleteBanner } from '../_service/bannerMethodApi'
import axios from 'axios'
import { BreadCrumb } from '../components/breadcrum'

export const BannerComponent = props => {
  const [statusMap, setStatusMap] = useState([{ id: 0, label: 'enable', value: 0 }, { id: 1, label: 'disable', value: 1 }])
  const [langs, setLangs] = useState([])
  const [langActive, setActive] = useState('th')
  const [name, setName] = useState()
  const [link, setLink] = useState()
  const [sortOrder, setsortOrder] = useState()
  const [startdate, setStartDate] = useState(moment())
  const [enddate, setEndDate] = useState()
  const [lastUpdate, setlastUpdate] = useState()
  const [fileenPreview, setimageUrlth] = useState()
  const [filethPreview, setimageUrlen] = useState()
  const [status, setStatus] = useState(statusMap[0].value)

  const CheckParams = props.params
  const { history } = props
  useEffect(() => {
    const fetchData = async () => {
      const langs = await Getlanguage()
      setLangs(langs.data.data.language)
    }
    fetchData()
    const fetchValue = async id => {
      const { data } = await GetBanner(id)
      setName(data.data.banner.name)
      setLink(data.data.banner.link)
      setsortOrder(data.data.banner.sortOrder)
      setStartDate(moment(data.data.banner.startdate))
      setEndDate(moment(data.data.banner.enddate))
      setlastUpdate(data.data.banner.lastUpdate)
      setimageUrlen(data.data.banner.bannerTranslations[0].imageUrl)
      setimageUrlth(data.data.banner.bannerTranslations[1].imageUrl)
      setStatus(data.data.banner.status)
    }

    if (CheckParams.id) {
      fetchValue(CheckParams.id)
    }
  }, [CheckParams.id])
  const fileLang = `file${langActive}`
  const handleChangeFile = async (formikProps, file) => {
    let isUploadError = false
    const imageFile = file.currentTarget.files[0]
    if (!imageFile) {
      isUploadError = true
      formikProps.setFieldError(fileLang, 'Required')
    } else if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/png') {
      isUploadError = true
      formikProps.setFieldError(fileLang, 'File not support')
    } else if (imageFile.size / 1024 / 1024 > 2) {
      isUploadError = true
      formikProps.setFieldError(fileLang, 'File size is exceeded')
    }
    formikProps.setFieldValue(fileLang, imageFile)
    if (!isUploadError) {
      let body = new FormData()
      body.append('bannerImage', imageFile)

      try {
        const result = await UploadBanner(body)
        const imageUrl = result.data.data.imageUrl
        console.log(imageUrl)
        formikProps.setFieldValue(`${fileLang}Preview`, imageUrl)
      } catch (e) {}
    }
  }

  const onChangeActiveAllLangs = (formikProps, e) => {
    const { checked } = e.target

    formikProps.setFieldValue('activeAllLangs', checked)

    if (checked) {
      setActive('th')
      formikProps.setFieldValue(`fileen`, '')
      formikProps.setFieldValue(`fileenPreview`, '')
    }
  }

  return (
    <React.Fragment>
      <FormContainer>
        <Formik
          initialValues={{
            name,
            link,
            sortOrder,
            status,
            startdate,
            enddate,
            fileenPreview,
            filethPreview,
            lastUpdate,
          }}
          enableReinitialize={true}
          validate={LoginSchema}
          // validationSchema={LoginSchema}
          onSubmit={async formValues => {
            if (CheckParams.id) {
              let value = {
                id: CheckParams.id,
                name: formValues.name,
                link: formValues.link,
                sortOrder: formValues.sortOrder,
                startTime: moment(formValues.startdate).format('YYYY-MM-DD'),
                endTime: moment(formValues.enddate).format('YYYY-MM-DD'),
                sortOrder: formValues.sortOrder,
                bannerTranslations: [
                  {
                    languageId: 2,
                    imageUrl: formValues.fileenPreview,
                  },
                  {
                    languageId: 5,
                    imageUrl: formValues.filethPreview,
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
                name: formValues.name,
                status: formValues.status,
                link: formValues.link,
                sortOrder: formValues.sortOrder,
                startTime: moment(formValues.startdate).format('YYYY-MM-DD'),
                endTime: moment(formValues.enddate).format('YYYY-MM-DD'),
                sortOrder: formValues.sortOrder,
                bannerTranslations: [
                  {
                    languageId: 2,
                    imageUrl: formValues.fileenPreview,
                  },
                  {
                    languageId: 5,
                    imageUrl: formValues.filethPreview,
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

            history.push('/')
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <LanguageContainer>
                {!CheckParams.id && <h1>Create Banner</h1>}
                {CheckParams.id && <h1>Edit Banner</h1>}
                <BreadCrumb />
                <Field
                  name="activeAllLangs"
                  component={FieldCheckboxInput}
                  value={props.values.testing}
                  onChange={e => onChangeActiveAllLangs(props, e)}
                  checkbox_text={'ใช้กับทุกภาษา'}
                />
                <div>
                  {langs.map((langs, index) => {
                    return (
                      <LanguageButton
                        isActive={langActive === langs.code}
                        onClick={() => !props.values.activeAllLangs && setActive(langs.code)}
                        key={index}
                      >
                        {langs.code}
                        {props.errors[`file${langs.code}`] && <div style={{ color: 'red' }}>error</div>}
                      </LanguageButton>
                    )
                  })}
                </div>
              </LanguageContainer>
              <div>Name</div>
              <Field
                name="name"
                component={FieldInput}
                value={props.values.name}
                onChange={props.handleChange}
                placeholder="Name"
                format="YYYY-MM-DD"
              />
              <div>URL</div>
              <Field name="link" component={FieldInput} value={props.values.link} onChange={props.handleChange} placeholder="Link" />
              <div>Sort Order</div>
              <Field name="sortOrder" component={FieldInput} value={props.values.sortOrder} onChange={props.handleChange} placeholder="SortOrder" />
              <div>Start Date</div>
              <Field
                name="startdate"
                component={FieldInputDatePicker}
                value={props.values.startdate}
                onChange={e => props.setFieldValue('startdate', e)}
                placeholder="Start Date"
              />
              <div>End Date</div>
              <Field
                name="enddate"
                component={FieldInputDatePicker}
                value={props.values.enddate}
                onChange={e => props.setFieldValue('enddate', e)}
                placeholder="End Date"
              />
              <div>File</div>
              <Field name={fileLang} component={FieldFileInput} value={''} onChange={e => handleChangeFile(props, e)} placeholder={fileLang} />
              <img alt="" style={{ width: '25%' }} src={props.values[`${fileLang}Preview`]} />
              <div>Status</div>
              <Field name="status" component={FieldRadioInput} value={props.values.status} onChange={props.handleChange} data={statusMap} />
              <ContainerButton>
                <Button type="danger" onClick={() => DeleteBanner(CheckParams.id)}>
                  Remove
                </Button>
                <Button>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </ContainerButton>
            </form>
          )}
        />
      </FormContainer>
    </React.Fragment>
  )
}
const LanguageButton = styled.button`
  background-color: ${props => (props.isActive ? '#007bff' : '#D7D8DC')};
  color: white;
  float: right;
  cursor: pointer;
`

const FormContainer = styled.div`
  background: #d6f4fd;
  padding: 2rem;
`

const LanguageContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const ContainerButton = styled.div`
  display: flex;
  margin-top: 1rem;
`

const FieldIn = styled.input`
  padding: 10px 11px 11px 11px;
  width: 100%;
  box-sizing: border-box;
  max-width: 400px;
`
