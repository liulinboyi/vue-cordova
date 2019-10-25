/* eslint-disable no-new */
import Vue from 'vue'

import router from './router/router'
import store from './store/store'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.yuanfanglai.top'
const auth = localStorage.getItem('token')
if (auth) {
  axios.defaults.headers.common['Authorization'] = auth
}
else {
  axios.defaults.headers.common['Authorization'] = null
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios
// 引入VConsole
import VConsole from 'vconsole'
const vConsole = new VConsole()

console.log(vConsole.version)
// 引入cub-ui
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  Dialog,
  Input,
  Swipe,
  scroll,
  ActionSheet,
  TabBar,
  TabPanels,
  Upload
} from 'cube-ui'

Vue.use(Button)
Vue.use(Style)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Swipe)
Vue.use(scroll)
Vue.use(ActionSheet)
Vue.use(TabBar)
Vue.use(TabPanels)
Vue.use(Upload)

// import Axios from 'axios'
// Vue.prototype.$http = Axios.create({
// baseURL: 'http://xxx.yyy.zzz/api',
// headers: {'token': '03F768854232E3713AAF3B5D302956'}
// })

// 安装一些工具类, platform有default export，用require会导入一个default属性，所以用import
import platform from './components/platform'
Vue.prototype.$platform = platform
Vue.prototype._invoke = require('lodash/invoke')
Vue.prototype._set = require('lodash/set')
Vue.prototype._get = require('lodash/get')
Vue.prototype._merge = require('lodash/merge')
Vue.prototype._defaults = require('lodash/defaults')
Vue.prototype._defaultsDeep = require('lodash/defaultsDeep')
Vue.prototype.$util = require('./components/util')

// icon：material很多图标不能在android4.4显示，fontawesome比ionicons大些
// animejs比animate.css兼容性更好
import animejs from 'animejs'
Vue.directive('anime', {
  bind (el, binding) {
    const opts = Object.assign({}, binding.value, { targets: el })
    animejs(opts)
  }
})
Vue.prototype.$anime = animejs

// 指令
import {VueTouch} from './utils/tap'
Vue.directive('tap', {
  bind: function (el, binding) {
    new VueTouch(el, binding, 'tap')
  }
})
Vue.directive('swipe', {
  bind: function (el, binding) {
    new VueTouch(el, binding, 'swipe')
  }
})
Vue.directive('swipeleft', {
  bind: function (el, binding) {
    new VueTouch(el, binding, 'swipeleft')
  }
})
Vue.directive('swiperight', {
  bind: function (el, binding) {
    new VueTouch(el, binding, 'swiperight')
  }
})
Vue.directive('swipedown', {
  bind: function (el, binding) {
    new VueTouch(el, binding, 'swipedown')
  }
})
Vue.directive('swipeup', {
  bind: function (el, binding) {
    new VueTouch(el, binding, 'swipeup')
  }
})
Vue.directive('longtap', {
  bind: function (el, binding) {
    new VueTouch(el, binding, 'longtap')
  }
})

import App from './App'
import { i18n } from './components/locale'
platform.bootup(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    /* 全局翻译 */
    i18n,
    router,
    store,
    /* runtime-only Vue 不支持直接嵌入模板，所以使用render函数 */
    render: h => h(App)
  })
})
