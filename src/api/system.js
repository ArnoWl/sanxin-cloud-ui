import request from '@/utils/request'

export function agreementList(query) {
  return request({
    url: '/system/queryAgreementList',
    method: 'get',
    params: query
  })
}

export function getAgreementDetail(query) {
  return request({
    url: '/system/getAgreementDetail',
    method: 'get',
    params: query
  })
}

export function updateAgreementDetail(query) {
  return request({
    url: '/system/updateAgreementDetail',
    method: 'post',
    params: query
  })
}

export function guideList(query) {
  return request({
    url: '/system/queryGuideList',
    method: 'get',
    params: query
  })
}

export function getGuideDetail(query) {
  return request({
    url: '/system/getGuideDetail',
    method: 'get',
    params: query
  })
}

export function updateGuideDetail(query) {
  return request({
    url: '/system/updateGuideDetail',
    method: 'post',
    params: query
  })
}

export function getAboutUs() {
  return request({
    url: '/system/getAboutUs',
    method: 'get'
  })
}

export function updateAboutUs(query) {
  return request({
    url: '/system/updateAboutUs',
    method: 'post',
    params: query
  })
}

export function queryGiftHourList(query) {
  return request({
    url: '/system/queryGiftHourList',
    method: 'get',
    params: query
  })
}

export function deleteGiftHour(query) {
  return request({
    url: '/system/deleteGiftHour',
    method: 'delete',
    params: query
  })
}

export function updateGiftHour(query) {
  return request({
    url: '/system/updateGiftHour',
    method: 'post',
    params: query
  })
}
