import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import './registerServiceWorker'
import FastClick from 'fastclick';
import VueTouch from 'vue-touch';

Vue.use(VueTouch, {name: 'v-touch'});
VueTouch.config.swipe = {threshold: 100}

import * as Sentry from '@sentry/browser'

Sentry.init({
    dsn: 'https://f9c0ab5ec7db46d7bb033d99030a4792@sentry.io/1337670',
    integrations: [new Sentry.Integrations.Vue({Vue})]
})
FastClick.attach(document.body);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    mounted () {
        // You'll need this for renderAfterDocumentEvent.
        document.dispatchEvent(new Event('render-event'))
    }
}).$mount('#app')
