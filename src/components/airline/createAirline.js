import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import { Button } from 'antd'
import { LoginSchema } from '../../helper/validator'
import styled from 'styled-components'
import { GetAirline, UpdateAirline, CreateAirline } from '../../_service/bannerMethodApi';
import { async } from 'q';
import { FieldInput } from '../input';


export const AirlineComponent = props => {
    const [name, setName] = useState()
    const [link, setLink] = useState()
    const [sortOrder, setSortOrder] = useState()
    const [imageUrl, setImageUrl] = useState()



    const CheckParams = props.params
    const { history } = props
    useEffect(() => {
        const fethValue = async id => {
            const { data } = await GetAirline(id)
            setName(data.airline.name)
            setLink(data.airline.link)
            setSortOrder(data.airline.sortOrder)
            setImageUrl(data.airline.imageUrl)
        }
        if (CheckParams.id) {
            fethValue(CheckParams.id)
        }
    })
    // const handleChangeFile = async (formikProps, file) => {
    //     let isUploadError = false
    //     const imageFile = file.currentTarget.files[0]
    //     if (!imageFile) {
    //         isUploadError = true
    //         formikProps.setFieldError()
    //     }
    // }

    return (
        <React.Fragment>
            <FormContainer>
                <Formik
                    initialValues={{
                        name,
                        link,
                        sortOrder,
                        imageUrl,
                    }}
                    enableReinitialize={true}
                    validate={LoginSchema}
                    onSubmit={async formValues => {
                        let data = {
                            name: formValues.name,
                            link: formValues.link,
                            sortOrder: formValues.sortOrder,
                            imageUrl: formValues.imageUrl
                        }
                        if (CheckParams.id) {
                            alert("Update Success")
                            data = { ...data, id: CheckParams.id }
                            await UpdateAirline(data)
                        } else {
                            await CreateAirline(data)
                        }
                        history.push("/")
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            <TextForm>Name</TextForm>
                            <Field
                                name="name"
                                component={FieldInput}
                                value={props.values.name}
                                onChange={props.handleChange}
                                placeholder="Name"
                            />
                            <TextForm>URL</TextForm>
                            <Field
                                name="link"
                                component={FieldInput}
                                value={props.values.link}
                                onChange={props.handleChange}
                                placeholder="LINK" />
                            <Field
                                name="sortOrder"
                                component={FieldInput}
                                value={props.values.sortOrder}
                                onChange={props.handleChange}
                                placeholder="SortOrder"
                            />
                            <TextForm>File</TextForm>
                            <Field
                                name="imageUrl"
                                component={FieldInput} value={''}
                            />
                        </form>

                    )}
                />
            </FormContainer>

        </React.Fragment>
    )
}

const FormContainer = styled.div`
  background: #d6f4fd;
  padding: 2rem;
`

const ContainerButton = styled.div`
  display: flex;
  margin-top: 1rem;
`
const TextForm = styled.div`
  margin-top: 1rem;
`