import request from '@/utils/request'
/**
 * 注册
 * @param ussername 用户名 password 密码
 * @returns
 */
export const userSignup = data => {
  return request({
    method: 'POST',
    url: '/h5/user/register',
    data
  })
}

export const userLogin = data => {
  return request({
    method: 'POST',
    url: '/h5/user/login',
    data
  })
}
