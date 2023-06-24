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
