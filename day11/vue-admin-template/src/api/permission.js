import reuqest from '@/utils/request'

// 获取权限列表
export function getPermissionList(params) {
  return reuqest({
    method: 'GET',
    url: '/sys/permission',
    params
  })
}
