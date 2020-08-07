const getters = {
  // 用户信息
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickName: state => state.user.nickName,
  userId: state => state.user.id,
  isNativeUser: state => state.user.isNativeUser,
  permissionInfo: state => state.user.permissionInfo,
  user: state => state.user
};
export default getters;
