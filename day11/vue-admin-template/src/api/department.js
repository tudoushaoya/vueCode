import request from '@/utils/request'
export function getDepartments() {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}

// 删除部门
export function delDepartments(id) {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}
// 获取部门负责人列表
export function getDepartmentDetail() {
  return request({
    method: 'GET',
    url: `/sys/user/simple`
  })
}
