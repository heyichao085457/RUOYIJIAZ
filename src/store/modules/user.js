import { login, logout, getInfo, buttonall } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'

const user = {
  state: {
    token: getToken(),
    id: '',
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {


          // const result = window.location.href.split('/wp');

          // 获取 permissions 的第一个元素
          const firstPermission = res.permissions[0];

          // 将第一个权限存储到本地存储中
          localStorage.setItem('firstPermission', firstPermission);
          if (res.code == 200) {
            // console.log(localStorage.getItem("firstPermission"), 'localStorage.getItem("firstPermission")');

            let params = {
              permissions: localStorage.getItem("firstPermission"),
            };
            buttonall(params).then((ok) => {
              // console.log(ok, "okkk");
              const permissions = ok.data['2023年卫片执法'];
              console.log(permissions);
              localStorage.setItem('permissions', JSON.stringify(permissions));
            });
          }
          // Cookies.set('result', result[0], { expires: 1 })
          const user = res.user
          const baseUrl = process.env.NODE_ENV === 'production' ? 'http://124.114.203.222:8084/wpzf/' : 'http://124.114.203.222:8084/wpzf/';
          const parts = user.avatar.split('wpzf/');
          let avatart = parts[1]
          Cookies.set('userId', res.user.userId, { expires: 1 })
          const avatar = (user.avatar == "" || user.avatar == null) ? require("@/assets/images/profile.jpg") : `${baseUrl}${avatart}`;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            // console.log(res.user.userId, 'getInfo///');
            // this.$cookies.set('userId', res.user.userId, { expires: '30d' });

            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_ID', user.userId)
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          localStorage.removeItem('firstPermission');
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
