import Cookies from 'js-cookie'

const TokenKey = 'ProjectFlow'
const RoleKey = 'Role'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// Role
export function setRole(role) {
  return Cookies.set(RoleKey, role)
}

export function getRole() {
  return Cookies.get(RoleKey)
}

export function removeRole() {
  return Cookies.remove(RoleKey)
}
