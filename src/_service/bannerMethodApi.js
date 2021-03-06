import axios from 'axios'

const base_url = 'http://travizgo.dosetech.co:7788'
// GetBanner All
export const GetBannerAll = async () => {
  return await axios
    .get(base_url + '/banner')
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}
// GetBanner with params
export const GetBanner = async id => {
  return await axios
    .get(base_url + `/banner/${id}`)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

// CreateBanner
export const BannerCreate = async () => {
  await axios
    .post(base_url + '/banner/create')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}
// getList Search data in table row
export const getList = async keyword => {
  const body = {
    name: keyword,
    status: 100,
    skip: 0,
    take: 10,
  }

  return await axios
    .post(base_url + '/banner/getList', body)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}
// uploadBanner
export const UploadBanner = async () => {
  await axios
    .post(base_url + '/banner/uploadBannerImage')
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

// UpdateBanner
export const UpdateBanner = async () => {
  await axios
    .post(base_url + '/banner/update')
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}
// DeleteBanner
export const DeleteBanner = async id => {
  return await axios
    .delete(base_url + `/banner/delete/${id}`)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}
// GetLanguage
export const Getlanguage = async () => {
  return await axios
    .get(base_url + '/language')
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}
