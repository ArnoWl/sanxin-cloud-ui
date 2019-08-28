import request from '@/utils/request'

export function advertList(query) {
  return request({
    url: '/advert/list',
    method: 'get',
    params: query
  })
}

export function handleAdvertStatus(query) {
  return request({
    url: '/advert/handleStatus',
    method: 'post',
    params: query
  })
}

export function getAdvertDetail(query) {
  return request({
    url: '/advert/getAdvertDetail',
    method: 'get',
    params: query
  })
}

export function businessList(query) {
  return request({
    url: '/business/list',
    method: 'get',
    params: query
  })
}

export function handleBusinessStatus(query) {
  return request({
    url: '/business/handleStatus',
    method: 'post',
    params: query
  })
}
