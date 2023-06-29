import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'GET'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'POST'
  })
}

// 修改用户密码
export function changePassword(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'PUT',
    data
  })
}

// 获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

export function exportExcel() {
  return request({
    url: '/sys/user/export',
    method: 'GET',
    responseType: 'blob'
  })
}

// 批量-下载导入员工模板
export function importTemplate() {
  return request({
    url: '/sys/user/import/template',
    method: 'GET',
    responseType: 'blob'
  })
}

// 批量-导入员工(上传excel)
export function importUsers(data) {
  return request({
    url: '/sys/user/import',
    method: 'POST',
    data
  })
}

// 获取员工基本信息
export function getPersonalDetail(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

// 新增员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

// 修改员工信息
export function updateEmployee(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

// 新增员工角色
export function addEmployeeRole(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
