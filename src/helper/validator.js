import * as Yup from 'yup'
import * as moment from 'moment'

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
  const { startdate, enddate, name, link, sortOrder, fileTH, fileENG, testing, lang } = formValue
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
  if (!fileTH) {
    errors.fileTH = 'Required'
  } else if (fileTH.type !== 'image/jpeg' && fileTH.type !== 'image/png') {
    errors.fileTH = 'File not support'
  } else if (fileTH.fileTH / 1024 / 1024 > 2) {
    errors.fileTH = 'File size is exceeded'
  }
  // validate lang
  //testing: false
  //lang: [{ TH , ENG}]
  //langActive: TH

  if (testing !== fileTH || fileENG) {
    errors.testing = 'กรุณาเลือกทุกภาษา'
  }
  // } else if (testing === fileTH || fileENG) {
  //   return true
  // }
  // if (fileTH !== ) {
  //   errors.fileTH = 'กรุณาใส่รูปภาพไทย'
  // }
  // if (fileENG !== ) {
  //   errors.fileENG = 'กรุณาใส่รูปภาพอังกฤษ'
  // }
  console.log(formValue)

  return errors
}
