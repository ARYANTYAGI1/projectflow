const getters = {
  language: state => state.app.language,
  token: state => state.user.token,
  userid: state => state.user.userid,
  name: state => state.user.name,
  status: state => state.user.status,
  roles: state => state.user.roles,
  role: state => state.user.role,
  isLoggedIn: state => state.user.isLoggedIn,
  fullName: state => state.user.fullName,
  firstName: state => state.user.firstName,
  email: state => state.user.email,
  userType: state => state.user.userType,
  socialType: state => state.user.socialType,
  picture: state => state.user.picture,
  isProfileComplete: state => state.user.isProfileComplete,
  errorLogs: state => state.errorLog.logs
}
export default getters
