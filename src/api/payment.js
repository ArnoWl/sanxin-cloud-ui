import request from '@/utils/request'

export function getAliPayDetail() {
  return request({
    url: '/payment/getAliPayDetail',
    method: 'get'
  })
}

export function editAliPay(data) {
  return request({
    url: '/payment/editAliPay',
    method: 'post',
    params: data
  })
}
