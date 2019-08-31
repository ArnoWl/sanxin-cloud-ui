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
