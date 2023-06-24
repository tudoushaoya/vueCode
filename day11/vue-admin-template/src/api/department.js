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

// 获取部门详情
export function getDepartmentInfo(id) {
  return request({
    method: 'GET',
    url: `/company/department/${id}`
  })
}

// 编辑部门
export function updateDepartments(data) {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
