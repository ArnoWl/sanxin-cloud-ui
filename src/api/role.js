import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

/**
 * 查询操作员列表分页
 * @param params
 */
export function queryUserList(params) {
  return request({
    url: '/role/querySysUserList',
    method: 'post',
    params: params
  })
}

/**
 * 添加操作员
 * @param params
 */
export function addUser(params) {
  return request({
    url: '/role/addUser',
    method: 'post',
    params: params
  })
}
/**
 * 查询角色列表不用分页
 */
export function queryRoleList(params) {
  return request({
    url: '/role/queryRoleList',
    method: 'post',
    params: params
  })
}

export function updateUserStatus(params) {
  return request({
    url: '/role/updateUserStatus',
    method: 'post',
    params: params
  })
}
export function queryMenus(roleid) {
  return request({
    url: '/role/queryMenus',
    method: 'post',
    params: { 'roleid': roleid }
  })
}
export function queryMyroleMenus(roleid) {
  return request({
    url: '/role/queryMyroleMenus',
    method: 'post',
    params: { 'roleid': roleid }
  })
}

export function updateRoleStatus(params) {
  return request({
    url: '/role/updateRoleStatus',
    method: 'put',
    params: params
  })
}
