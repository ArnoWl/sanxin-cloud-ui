import request from '@/utils/request'

export function customerCashRule() {
  return request({
    url: '/cash/getCustomerCashRule',
    method: 'get'
  })
}

export function businessCashRule() {
  return request({
    url: '/cash/getBusinessCashRule',
    method: 'get'
  })
}

export function updateCashRule(data) {
  return request({
    url: '/cash/updateCashRule',
    method: 'post',
    params: data
  })
}

export function queryCashList(query) {
  return request({
    url: '/cash/queryCashList',
    method: 'get',
    params: query
  })
}

export function handleCashStatus(query) {
  return request({
    url: '/cash/handleStatus',
    method: 'post',
    params: query
  })
}

export function queryBankTypeList(query) {
  return request({
    url: '/cash/queryBankTypeList',
    method: 'get',
    params: query
  })
}

export function handleBankTypeStatus(query) {
  return request({
    url: '/cash/handleBankTypeStatus',
    method: 'post',
    params: query
  })
}

export function handleBankType(query) {
  return request({
    url: '/cash/handleBankType',
    method: 'post',
    params: query
  })
}
