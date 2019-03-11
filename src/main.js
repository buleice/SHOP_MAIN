import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import './registerServiceWorker'
import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload'
import Loading from './components/base/loading/loading'
import wxLoading from './components/loading/index'
import MESSAGE from './components/Message/index'
import DialogIndexs from './components/toast/index'
import 'components/toast/toast.css'
Vue.use(DialogIndexs)
Vue.use(MESSAGE);
Vue.use(wxLoading);
Vue.component('Loading',Loading)
Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  // set observer to true
   observer: true,
   // optional
   observerOptions: {
     rootMargin: '800px',
     threshold: 0.3
   }
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

export {
    Vue
}

