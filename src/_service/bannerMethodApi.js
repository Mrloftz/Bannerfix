import axios from 'axios'

const base_url = 'http://travizgo.dosetech.co:7788'
const airline_url = 'http://travizgo.dosetech.co:7755'

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
export const BannerCreate = data => {
  return axios
    .post(base_url + '/banner/create', data)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
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
export const UploadBanner = async body => {
  return await axios
    .post(base_url + '/banner/uploadBannerImage', body)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

// UpdateBanner
export const UpdateBanner = body => {
  return axios
    .post(base_url + '/banner/update', body)
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

// Airline API


// Get Airline all
export const GetAilrlineAll = async () => {
  return await axios
    .get(airline_url + '/airline/all')
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

// Get Airline with Params
export const GetAirline = async id => {
  return await axios
    .get(airline_url + `/airline/${id}`)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

// Get Airline List
export const GetAirlineList = async () => {
  const body = {
    name: "",
    page: 1,
    itemPerPage: 5
  }
  return await axios
    .post(airline_url + '/airline/list', body)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

/// Get Airline Search 
export const GetAirlineSearch = async keyword => {
  const body = {
    name: keyword,
    page: 1,
    itemPerPage: 5
  }
  return await axios
    .post(airline_url + '/airline/list', body)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

/// Create Airline 
export const CreateAirline = async body => {
  return await axios
    .post(airline_url + '/airline', body)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

/// Update Airline 
export const UpdateAirline = async body => {
  return await axios
    .put(airline_url + '/airline', body)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}

/// Delete Airline 
export const DeleteAirline = async id => {
  return await axios
  .delete(airline_url + `/airline/${id}`)
  .then(response => {
    return response
  })
  .catch(error => {
    return error
  })
}