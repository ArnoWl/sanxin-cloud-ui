import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    params: params
  })
}

export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'post',
    params: {"token":getToken()}
  })
}

export function getMenus(roleid){
  return request({
    url: '/user/getMenus',
    method: 'post',
    params: {"token":getToken(),"roleid":roleid}
  })
}

export function logout() {
  return request({
    url: '/loginOut',
    method: 'post',
    params: {"token":getToken()}
  })
}
