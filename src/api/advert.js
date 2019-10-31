import request from '@/utils/request'

export function advertContentList(query) {
  return request({
    url: '/advert/queryAdvertContentList',
    method: 'get',
    params: query
  })
}

export function getAdvertContentDetail(query) {
  return request({
    url: '/advert/getAdvertContentDetail',
    method: 'get',
    params: query
  })
}

export function handleEditAdvertContent(query) {
  return request({
    url: '/advert/handleEditAdvertContent',
    method: 'post',
    params: query
  })
}

export function queryEventType() {
  return request({
    url: '/queryEventType',
    method: 'get'
  })
}

export function handleAdvertContentStatus(query) {
  return request({
    url: '/advert/handleAdvertContentStatus',
    method: 'post',
    params: query
  })
}

export function handleAdvertContentHomeShow(query) {
  return request({
    url: '/advert/handleAdvertContentHomeShow',
    method: 'post',
    params: query
  })
}

export function advertFindList(query) {
  return request({
    url: '/advert/queryAdvertFindList',
    method: 'get',
    params: query
  })
}

export function getAdvertFindDetail(query) {
  return request({
    url: '/advert/getAdvertFindDetail',
    method: 'get',
    params: query
  })
}
export function handleEditAdvertFind(query) {
  return request({
    url: '/advert/handleEditAdvertFind',
    method: 'post',
    params: query
  })
}

export function handleAdvertFindStatus(query) {
  return request({
    url: '/advert/handleAdvertFindStatus',
    method: 'post',
    params: query
  })
}
