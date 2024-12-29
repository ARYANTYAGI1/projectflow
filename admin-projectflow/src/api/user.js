import request from '@/utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'

export function getUsersList(query) {
  return request({
    url: '/users/list/',
    method: 'get',
    params: query
  })
}

export function changePassword(data) {
  return request({
    url: '/password/change',
    method: 'put',
    data
  })
}

export function verifyForgotPasswordCode(data) {
  return request({
    url: '/verify/code',
    method: 'put',
    data
  })
}

export function verifyUserAccount(id, email, token) {
  return request({
    url: '/verify/account/email/' + id + '/' + email + '/' + token,
    method: 'get'
  })
}

export function getUserDetail(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function blockUser(id, data) {
  return request({
    url: '/user/status/' + id,
    method: 'put',
    data: data
  })
}


export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function updateUser(id, data) {
  return request({
    url: '/user/' + id,
    method: 'put',
    data: data
  })
}

export const updateProfile = (opts) => {
  var header = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + getToken(),
      'Accept-Language': 'it-IT,it;q=0.9'
    }
  }
  var data = new FormData()
  data.append('firstName', opts.firstName)
  data.append('lastName', opts.lastName)
  data.append('address', opts.address ? opts.address : '')
  data.append('zipCode', opts.zipCode ? opts.zipCode : '')
  data.append('city', opts.city ? opts.city : '')
  data.append('province', opts.province ? opts.province : '')
  data.append('state', opts.state ? opts.state : '')
  data.append('region', opts.region ? opts.region : '')
  data.append('picture', opts.imageFile ? opts.imageFile : '')
  return new Promise((resolve, reject) => {
    axios.put(import.meta.env.VITE_BASE_API + '/update/profile', data, header).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error.response)
    })
  })
}