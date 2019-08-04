import * as Yup from 'yup'
import * as moment from 'moment'
import { file } from '@babel/types'

// export const LoginSchema = Yup.object().shape({
//   name: Yup.string().required('Required'),
//   link: Yup.string().required('Required'),
//   sortOrder: Yup.string().required('Required'),
//   startdate: Yup.date().required('Required'),
//   enddate: Yup.date().required('Required'),
//   file: Yup.mixed().required('A file is required'),
// })

export const LoginSchema = formValue => {
  let errors = {}
  const { startdate, enddate, name, link, sortOrder, fileth, fileen, activeAllLangs, filethPreview, fileenPreview } = formValue
  // input validate
  if (!enddate) {
    // errors.startdate = 'Required'
    errors.enddate = 'Required'
  } else if (moment(startdate) > moment(enddate)) {
    errors.enddate = 'Invalid date!'
  }
  if (!name) {
    errors.name = 'Required'
  }
  if (!link) {
    errors.link = 'Required'
  }
  if (!sortOrder) {
    errors.sortOrder = 'Required'
  }
  // upload validate image
  if (!filethPreview) {
    if (!fileth) {
      errors.fileth = 'Required'
    } else if (fileth.type !== 'image/jpeg' && fileth.type !== 'image/png') {
      errors.fileth = 'File not support'
    } else if (fileth.size / 1024 / 1024 > 2) {
      errors.fileth = 'File size is exceeded'
    }
  }

  if (!activeAllLangs) {
    if (!fileth && !filethPreview) {
      errors.fileth = 'กรุณาใส่รูปภาพไทย'
    }
    if (!fileen && !fileenPreview) {
      errors.fileen = 'กรุณาใส่รูปภาพภาษาอังกฤษ'
    }
  }

  console.log(errors)

  return errors
}
