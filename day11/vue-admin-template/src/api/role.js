import requeset from '@/utils/request'

// 获取已启用的角色列表
export function getRoleList(params) {
  return requeset({
    method: 'GET',
    url: '/sys/role',
    params
  })
}

// 删除角色
export function delRole(id) {
  return requeset({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}

// 新增角色
export function addRole(data) {
  return requeset({
    method: 'POST',
    url: '/sys/role',
    data
  })
}

// 获取角色详情
export function getRoleDetail(id) {
  return requeset({
    method: 'GET',
    url: `/sys/role/${id}`
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return requeset({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data
  })
}
