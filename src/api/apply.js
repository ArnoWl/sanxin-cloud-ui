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

export function queryAllBusinessList() {
  return request({
    url: '/business/queryAllList',
    method: 'get'
  })
}

export function getBusinessDetail(query) {
  return request({
    url: '/business/getBusinessDetail',
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

export function handleEditBusiness(query) {
  return request({
    url: '/business/handleEditBusiness',
    method: 'post',
    params: query
  })
}

export function agentList(query) {
  return request({
    url: '/agent/list',
    method: 'get',
    params: query
  })
}

export function getAgentDetail(query) {
  return request({
    url: '/agent/getAgentDetail',
    method: 'get',
    params: query
  })
}

export function handleAgentStatus(query) {
  return request({
    url: '/agent/handleStatus',
    method: 'post',
    params: query
  })
}

export function resetLoginPass(query) {
  return request({
    url: '/business/resetLoginPass',
    method: 'post',
    params: query
  })
}

export function resetPayPass(query) {
  return request({
    url: '/business/resetPayPass',
    method: 'post',
    params: query
  })
}

export function resetAgentLoginPass(query) {
  return request({
    url: '/agent/resetLoginPass',
    method: 'post',
    params: query
  })
}
