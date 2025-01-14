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

export function getProjectList(query) {
  return request({
    url: '/project/list',
    method: 'get',
    params: query
  })
}

export function getProjectDetail(id) {
  return request({
    url: '/project/detail/' + id,
    method: 'get',
  })
}

export function updateProject(id, data) {
  return request({
    url: '/project/update-project/' + id,
    method: 'put',
    data: data
  })
}

export function getProjects() {
  return request({
    url: '/project/projects',
    method: 'get'
  })
}

export function getProjectMembers(id) {
  return request({
    url: '/project/project-members/' + id,
    method: 'get'
  })
}
