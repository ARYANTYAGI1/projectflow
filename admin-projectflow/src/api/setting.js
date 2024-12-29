import request from '@/utils/request'

export function addKey(data) {
    return request({
        url: '/add/key',
        method: 'post',
        data
    })
}
export function getKey() {
    return request({
        url: '/key',
        method: 'get',
    })
}
export function removeKey(id) {
    return request({
        url: '/delete/key/' + id,
        method: 'delete'
    })
}
export function updateKey(id, data) {
    return request({
        url: '/update/key/' + id,
        method: 'put',
        data: data
    })
}

// appKey
export function addAppKey(data) {
    return request({
        url: '/add/appkey',
        method: 'post',
        data
    })
}
export function getAppKey() {
    return request({
        url: '/detail/appkey',
        method: 'get',
    })
}
export function removeAppKey(id) {
    return request({
        url: '/delete/appkey/' + id,
        method: 'delete'
    })
}
export function updateAppKey(id, data) {
    return request({
        url: '/update/appkey/' + id,
        method: 'put',
        data: data
    })
}