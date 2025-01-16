import request from '@/utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'

export function createTask(data) {
    return request({
        url: '/task/add-task',
        method: 'post',
        data
    })
}

export function getTaskList(query) {
    return request({
      url: '/task/task-list',
      method: 'get',
      params: query
    })
}
  