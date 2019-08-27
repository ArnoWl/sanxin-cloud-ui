import Cookies from 'js-cookie'

const TokenKey = 'CMZMXCGtKA-Token'

export function getToken() {
  return Cookies.get(TokenKey)=='null'?'':Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}