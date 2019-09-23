import request from '@/utils/request'

export function labelMsg(query) {
  return request({
    url: '/home/labelMsg',
    method: 'get',
    params: query
  })
}

export function queryCashStatistics() {
  return request({
    url: '/home/queryCashStatistics',
    method: 'get'
  })
}
