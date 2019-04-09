import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import './registerServiceWorker'
import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload'
import Loading from './components/base/loading/loading'
import wxLoading from './components/loading/index'
import MESSAGE from './components/Message/index';
import { shareControl } from './common/js/share-control'
import { Dialog } from 'vant';

Vue.use(Dialog);

Vue.config.productionTip = false;


Vue.use(MESSAGE);
Vue.use(wxLoading);
Vue.component('Loading', Loading)
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

const needHideTabBarList = ['CashCneter', 'BindBankcard', 'userCash', 'CashRecord', 'OrderPage', 'orderDetail', 'unpayOrder', 'OrderList', 'AddAddress', 'EditAddress', 'AddressList', 'AddAddress', 'GivingCourse', 'ReceiveCourse', 'receiveSuccess', 'ShareCourse', 'UserCoupon']
/**
 * @description: 控制页面下的tabBar是否隐藏或者显示 
 * @param {type} 
 * @return: 
 */
router.beforeEach((to, from, next) => {
    shareControl(to.name);
    if (to.meta != undefined) {
        document.title = to.meta
    }
    if (needHideTabBarList.includes(to.name)) {
        store.dispatch("setShowTabBar", false);
    } else if (needHideTabBarList.includes(from.name)) {
        store.dispatch("setShowTabBar", true)
    }
    next();
})
FastClick.attach(document.body);

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        // You'll need this for renderAfterDocumentEvent.
        document.dispatchEvent(new Event('render-event'))
    }
}).$mount('#app')

export {
    Vue
}

