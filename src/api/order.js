import request from '@/utils/request'

export function orderList(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query
  })
}

export function orderDetail(query) {
  return request({
    url: '/order/detail',
    method: 'get',
    params: query
  })
}
