const bugsnag = require('bugsnag-js')
const bugsnagClient = bugsnag('a325ef302b363d86bcc9948c2901ac91')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import './registerServiceWorker'
const bugsnagVue = require('bugsnag-vue')
import FastClick from 'fastclick';
bugsnagClient.use(bugsnagVue(Vue))
FastClick.attach(document.body);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
