import React from 'react'
import styled from 'styled-components'

const FieldFileInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc
  ...rest
}) => {
  const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
  return (
    <React.Fragment>
      <InputWrapper {...field} {...rest} error={error} type="file" />
      <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
    </React.Fragment>
  )
}

export { FieldFileInput }

const InputWrapper = styled.input`
  color: transparent;
`

const ErrorText = styled.div`
  color: red;
  font-size: 20px;
`
