import request from '@/utils/request'

export function addressListByPid(query) {
  return request({
    url: '/address/queryAddressListByPid',
    method: 'get',
    params: query
  })
}

export function editAddress(query) {
  return request({
    url: '/address/editAddress',
    method: 'post',
    params: query
  })
}
