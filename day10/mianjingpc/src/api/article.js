import request from '@/utils/request'
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/admin/interview/query',
    params
  })
}
// 删除文章
export function deleteArticle (id) {
  return request({
    method: 'DELETE',
    url: '/admin/interview/remove',
    data: { id }
  })
}
// 添加文章
export function addArticle (data) {
  return request({
    method: 'POST',
    url: '/admin/interview/create',
    data
  })
}

export function getArticle (id) {
  return request({
    method: 'GET',
    url: '/admin/interview/show',
    params: { id }
  })
}

export function updateArticle (data) {
  return request({
    method: 'PUT',
    url: '/admin/interview/update',
    data
  })
}
