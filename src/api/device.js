import request from '@/utils/request'

export function deviceList(query) {
  return request({
    url: '/device/queryDeviceList',
    method: 'get',
    params: query
  })
}

export function handleDeviceStatus(query) {
  return request({
    url: '/device/handleDeviceStatus',
    method: 'post',
    params: query
  })
}

export function getDeviceDetail(query) {
  return request({
    url: '/device/getDeviceDetail',
    method: 'get',
    params: query
  })
}

export function handleEditDevice(data) {
  return request({
    url: '/device/handleEditDevice',
    method: 'post',
    params: data
  })
}
