const KEY = 'mianjing-h5-token'

// 存
export const setToken = (newValue) => {
  localStorage.setItem(KEY, newValue)
}

// 取
export const getToken = () => {
  return localStorage.getItem(KEY)
}

// 删
export const removeToken = () => {
  localStorage.removeItem(KEY)
}
