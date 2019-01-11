import Vue from 'vue';
import Router from 'vue-router';

const Shop = () => import('./components/main-entry/shop.vue');
const Mine = () => import('./components/main-entry/user.vue');
const Bonus = () => import('./components/main-entry/bonus.vue');
const Course = () => import('./components/main-entry/course.vue');
const BonusBill = () => import('./components/base/bonus-bill/bonus-bill.vue');
const BonusIndex = () => import('./components/base/bonus-index/bonus-index.vue');
const ShopDefault=()=>import('./components/shop-default/shop-default');
const ShopClassify=()=>import('./components/classify/classify');
Vue.use(Router);


export default new Router({
    // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/shop'
        },
        {
            path: '/shop',
            component:Shop,
            children:[
                {path: '/', redirect: 'default'},
                {path:'default',
                    name:'default',
                    component:ShopDefault,
                },
                {path:'classify/:cid',
                    component:ShopClassify,
                    name:'classify',
                    props:true,
                }
            ]
        },
        {
            path: '/mine',
            name: 'mine',
            component: Mine
        },
        {
            path: '/course',
            name: 'Course',
            component: Course
        },
        {
            path: '/bonus',
            component: Bonus,
            children: [
                {path: '/', redirect: 'center'},
                {
                    path: 'center',
                    component: BonusIndex,
                    name: 'BonusIndex'
                },
                {
                    path: 'bill',
                    component: BonusBill,
                    name: 'BonusBill'
                }
            ]
        }
    ]
});
