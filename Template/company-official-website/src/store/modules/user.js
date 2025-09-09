import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'
import {Message, Notification} from 'element-ui'
import md5 from 'js-md5'
import moment from "moment";

// 初始状态
const state = {
    token: getToken(), name: '游客', avatar: '', introduction: '', roles: [], mobile: '', id: '', isPay: false,
}
// 修改状态
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    }, SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    }, SET_NAME: (state, name) => {
        state.name = name
    }, SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }, SET_ROLES: (state, roles) => {
        state.roles = roles
    }, SET_MOBILE: (state, mobile) => {
        state.mobile = mobile
    }, SET_LOGIN_ID: (state, id) => {
        state.id = id
    }, SET_IS_PAY: (state, isPay) => {
        state.isPay = isPay
    }

}

// 异步操作
const actions = {
    // 登录
    login({commit}, userInfo) {
        const {userName, password} = userInfo
        commit('SET_PASSWORD', password)
        localStorage.setItem('SET_NAME', userName)
        commit('SET_NAME', userName)

        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                const { data } = response
                console.log('Store login response:', response); // 打印Store登录响应
                if (response.code === 0) {
                    localStorage.setItem('token', data.token)
                    commit('SET_TOKEN', data.token)
                    setToken(data.token) // 将 token 存储到 Vuex 和 localStorage 中
                    resolve(response)
                } else {
                    console.error('Store login error:', error); // 打印Store登录错误
                    reject(new Error('账号或密码错误！'))
                }
            }).catch(error => {
                reject(error)
            })

            // login({email: username.trim(), password: md5Password, loginMode: 1}).then(response => {
            //   // 登录业务判断
            //   // ...
            //   resolve()
            // }).catch(error => {
            //   reject(error)
            // })
        })
    }, 
    // 获取用户信息
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            const tokens = getToken()
            getInfo(tokens).then(response => {
                const roleList = response.body.sessionSubject.roleList
                const roleArr = []
                roleList.forEach(item => {
                    roleArr.push(item.id)
                })
                const data = {
                    roles: roleArr, name: response.body.nickname, mobile: response.body.mobile
                }
                sessionStorage.setItem('supId', roleList[0].supId)
                sessionStorage.setItem('supName', roleList[0].supName)
                sessionStorage.setItem('loginNum', response.body.loginNum)
                if (response.status != 0) {
                    reject('请重新登录！')
                }
                const {roles, name, mobile} = data
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }
                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_MOBILE', mobile)
                commit('SET_LOGIN_ID', response.body.id)
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    // 登出
    logout({commit, state, dispatch}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                // reset visited views and cached views
                dispatch('tagsView/delAllViews', null, {root: true})
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 重置token
    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // 动态修改权限
    async changeRoles({commit, dispatch}, role) {
        const token = role + '-token'
        commit('SET_TOKEN', token)
        setToken(token)
        const {roles} = await dispatch('getInfo')
        resetRouter()
        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, {root: true})
    }
}

export default {
    namespaced: true, state, mutations, actions
}
