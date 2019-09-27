import request from '@/utils/request'

export function customerList(query) {
  return request({
    url: '/customer/list',
    method: 'get',
    params: query
  })
}

export function handleCustomerStatus(data) {
  return request({
    url: '/customer/handleCustomerStatus',
    method: 'post',
    params: data
  })
}

export function handleUpdatePayWord(data) {
  return request({
    url: '/customer/handleUpdatePayWord',
    method: 'post',
    params: data
  })
}

export function handleUpdatePassWord(data) {
  return request({
    url: '/customer/handleUpdatePassWord',
    method: 'post',
    params: data
  })
}

export function customerAmountDetails(query) {
  return request({
    url: '/customer/amountDetails',
    method: 'get',
    params: query
  })
}

export function customerTimeDetails(query) {
  return request({
    url: '/customer/timeDetails',
    method: 'get',
    params: query
  })
}
