import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import { FieldInput, FieldInputDatePicker, FieldCheckboxInput, FieldFileInput, FieldRadioInput } from '../components/input'
import { Button } from 'antd'
import { LoginSchema } from '../helper/validator'
import * as moment from 'moment'
import styled from 'styled-components'
import { UploadBanner } from '../_service/bannerMethodApi'

export const BannerComponent = () => {
  const [status, setStatus] = useState([{ id: 0, label: 'enable', value: 1 }, { id: 1, label: 'disable', value: 0 }])
  const [langs, setLangs] = useState([{ id: 0, label: 'TH' }, { id: 1, label: 'ENG' }])
  const [langActive, setActive] = useState('TH')

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
        formikProps.setFieldValue(`${fileLang}Preview`, imageUrl)
      } catch (e) {}
    }
  }

  return (
    <React.Fragment>
      <FormContainer>
        <Formik
          initialValues={{
            status: status[0].value,
            startdate: moment(),
          }}
          validate={LoginSchema}
          // validationSchema={LoginSchema}
          onSubmit={values => {
            console.log(values)
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <LanguageContainer>
                <Field
                  name="testing"
                  component={FieldCheckboxInput}
                  value={props.values.testing}
                  onChange={props.handleChange}
                  checkbox_text={'ใช้กับทุกภาษา'}
                />
                <div>
                  {langs.map((lang, index) => {
                    return (
                      <LanguageButton isActive={langActive === lang.label} onClick={() => setActive(lang.label)} key={index}>
                        {lang.label}{' '}
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
              <Field name="status" component={FieldRadioInput} value={props.values.status} onChange={props.handleChange} data={status} />
              <ContainerButton>
                <Button type="danger">Remove</Button>
                <Button>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button type="primary" htmlType="button">
                  Save & Exit
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
