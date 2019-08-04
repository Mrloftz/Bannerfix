import React from 'react'
import styled from 'styled-components'
import { Radio } from 'antd'

const FieldRadioInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  data,
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
  return (
    <React.Fragment>
      <Radio.Group {...field}>
        {data.map((ratio, index) => {
          return (
            <Radio value={ratio.value} key={index}>
              {ratio.label}{' '}
            </Radio>
          )
        })}
      </Radio.Group>
      <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
    </React.Fragment>
  )
}

export { FieldRadioInput }

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
