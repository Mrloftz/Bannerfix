import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd'

const FieldCheckboxInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  checkbox_text,
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
  return (
    <React.Fragment>
      <InputCheckboxWrapper {...field} {...rest} error={error}>
        {checkbox_text}
      </InputCheckboxWrapper>
      <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
    </React.Fragment>
  )
}

export { FieldCheckboxInput }

const InputCheckboxWrapper = styled(Checkbox)`
  &.ant-input {
    border: ${props => (props.error ? '1px solid red' : '1px solid #d9d9d9')};
  }
`

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
