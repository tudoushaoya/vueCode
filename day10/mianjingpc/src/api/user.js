import request from '@/utils/request'

export const signin = data => {
  return request({
    method: 'POST',
    url: '/auth/login',
    data
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/auth/currentUser'
  })
}
