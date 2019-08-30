import Cookies from 'js-cookie'

const TokenKey = 'CMZMXCGtKA-Token'
const LanguageKey = 'language-Token'

export function getToken() {
  return Cookies.get(TokenKey) == 'null' ? '' : Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLanguage() {
  return Cookies.get(LanguageKey) == 'null' ? 'CN' : Cookies.get(LanguageKey)
}

export function setLanguage(language) {
  return Cookies.set(LanguageKey, language)
}

export function removeLanguage() {
  return Cookies.remove(LanguageKey)
}
