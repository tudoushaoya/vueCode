import request from '@/utils/request'
import { getToken } from '@/utils/storage'
// 注册
// 参数 username password
export const userRegister = data => {
  return request({
    method: 'POST',
    url: 'user/register',
    data
  })
}

// 登录接口
export const login = (data) => {
  return request.post('user/login', data)
}

// 获取用户信息
export const getArticles = (obj) => {
  const token = getToken()

  return request.get('/interview/query', {
    params: {
      current: obj.current, // 当前页
      pageSize: 10, // 每页条数
      sorter: obj.sorter // 排序字段 =>  传"weight_desc" 获取 推荐， "不传" 获取 最新
    },
    headers: {
      // 注意 Bearer 和 后面的空格不能删除，为后台的token辨识
      Authorization: `Bearer ${token}`
    }
  })
}
