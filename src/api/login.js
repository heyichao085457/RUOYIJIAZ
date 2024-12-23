import request from '@/utils/request'


//查询图斑字典数据信息
export function freckleDict() {
  return request({
    url: 'freckleDict/all',
    method: 'get',
  })
}
//列表
export function patch() {
  return request({
    url: 'patch/list',
    method: 'get',
  })
}
//工作台
export function listName(params) {
  return request({
    url: 'task/list',
    method: 'get',
    params: params
  })
}
//首页选择器
export function taskDataList() {

  return request({
    url: 'task/taskDataList',
    method: 'get',

  })
}
// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

export function buttonall(params) {
  return request({
    url: 'button/all',
    method: 'get',
    params: params,
  })
}