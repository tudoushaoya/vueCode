const KEY = 'heima_chengdu_token'
export const setToken = (data) => {
  localStorage.setItem(KEY, data)
}

export const getToken = () => {
  return localStorage.getItem(KEY)
}
export const removeToken = () => {
  localStorage.removeToken(KEY)
}
