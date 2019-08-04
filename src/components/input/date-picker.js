import React from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd'

const FieldInputDatePicker = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
  return (
    <React.Fragment>
      <InputDatePickerWrapper {...field} {...rest} error={error} />
      <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
    </React.Fragment>
  )
}

export { FieldInputDatePicker }

const InputDatePickerWrapper = styled(DatePicker)`
  width: 100%;
  &.ant-input {
    border: ${props => (props.error ? '1px solid red' : '1px solid #d9d9d9')};
  }
`

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
