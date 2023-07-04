const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userinfo.staffPhoto,
  name: state => state.user.userinfo.username,
  company: state => state.user.userinfo.company,
  departmentName: state => state.user.userinfo.departmentName
}
export default getters
