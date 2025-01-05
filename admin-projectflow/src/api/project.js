import request from '@/utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'

export function getMemberList() {
  return request({
    url: '/users/member-list',
    method: 'get'
  })
}

export function createProject(data) {
  return request({
    url: '/project/add-project',
    method: 'post',
    data
  })
}

export function getProjectList() {
  return request({
    url: '/project/list',
    method: 'get'
  })
}