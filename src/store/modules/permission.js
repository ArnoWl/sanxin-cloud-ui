import { queryMyroleMenus } from '@/api/role'
import { constantRoutes } from '@/router'
/* Layout */
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children)
    }
    res.push(tmp)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes: function({ commit }, roles) {
    return new Promise(resolve => {
      const arr = []
      queryMyroleMenus(roles).then(response => {
        const { data } = response
        for (var i = 0; i < data.length; i++) {
          const childlist = data[i].childList
          const children = []
          for (var c = 0; c < childlist.length; c++) {
            const url = childlist[c].url
            const child = {
              path: url,
              component: () => import(`@/views${url}`),
              name: url,
              meta: {
                title: childlist[c].menuname
              }
            }
            children.push(child)
          }
          const main = {
            path: '/' + data[i].url,
            redirect: 'noRedirect',
            component: Layout,
            alwaysShow: true, // will always show the root menu
            name: data[i].url,
            meta: {
              title: data[i].menuname,
              icon: data[i].icon
            },
            children: children
          }
          arr.push(main)
        }
        var page404 = { path: '*', redirect: '/404', hidden: true }
        arr.push(page404)
        const accessedRoutes = filterAsyncRoutes(arr)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
