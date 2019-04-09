import Vue from 'vue';
import Router from 'vue-router';
Router.prototype.go = function () {
    this.isBack = true
    window.history.go(-1)
}

const Shop = () => import('./views/shop.vue'); //商城首页页面
const Mine = () => import('./views/user.vue'); //个人中心页面
const Course = () => import('./views/course.vue'); //我的课程页面

// 奖学金,提现
const Bonus = () => import('./views/bonus-manage.vue'); //奖学金页面
const BonusBill = () => import('./components/bonu-manage/bonus-bill.vue'); //奖学金获取记录页面
const BonusIndex = () => import('./components/bonu-manage/bonus-index.vue'); //奖学金tab默认页面
const CashCneter=()=>import('./components/bonu-manage/cash-center'); //提现个人中心页面
const CashRecord=()=>import('./components/bonu-manage/cash-record'); //提现记录页面
const userCash=()=>import('./components/bonu-manage/user-cash'); //用户发起提现页面
const BindBankcard=()=>import('./components/bonu-manage/bind-bankcard') //绑定一行卡及修改银行卡信息页面
const Cash=()=>import('./components/bonu-manage/cash') //提现页面

const ShopDefault = () => import('./components/shop-default/shop-default'); //默认商城首页
const ShopClassify = () => import('./components/classify/classify'); //课程分类页面
const Crunchies = () => import('./components/classify/crunchies');  //热门课程排名页面
const GivingCourse = () => import('./components/giving-courses/giving-courses') //我的赠课页
const ReceiveCourse = () => import('./components/receive-course/receive-course') //领取赠课页
const ReceiveSuccess = () => import('./components/receive-success/receive-success') //领取成功页面
const ShareCourse = () => import('./components/share-course/share-course') //发起分享赠课页
const UserCoupon=()=>import( './views/coupon.vue');
//地址
const Address=()=>import('./views/address') //地址页面
const AddAddress=()=>import('./components/addressMange/addAddress') //添加地址
const EditAddress=()=>import('./components/addressMange/editAddress.vue') //编辑地址
const AddressList=()=>import('./components/addressMange/addressList') //地址列表

//订单
const OrderManage=()=>import('./views/order') //订单管理页面
const OrderPage=()=>import('./components/orderManage/order-page') //下单页面
const OrderList=()=>import('./components/orderManage/order-list') //订单列表页面
const orderDetail=()=>import('./components/orderManage/order-detail') //订单详情页面
const unpayOrder=()=>import('./components/orderManage/unpay-order') //未支付订单页面
Vue.use(Router);


export default new Router({
    mode: 'history',
    base: '/',
    routes: [{
            path: '/shop',
            component: Shop,
            meta: '小伴龙优学',
            redirect: '/shop/default',
            children: [{
                    path: 'default',
                    name: 'default',
                    component: ShopDefault,
                    meta: '小伴龙优学课程',
                },
                {
                    path: 'classify/:cid',
                    component: ShopClassify,
                    name: 'classify',
                    props: true,
                    meta: '小伴龙优学课程',
                },
                {
                    path: 'crunchies/:id',
                    component: Crunchies,
                    name: 'crunchies',
                    props: true,
                    meta: '小伴龙优学课程',
                }
            ]
        },
        {
            path: '/mine',
            name: 'mine',
            component: Mine,
            meta: '个人中心'
        },
        {
            path: '/course',
            name: 'Course',
            component: Course,
            meta: '我的课程'
        },
        {
            path: '/bonus',
            component: Bonus,
            name: 'Bonus',
            meta: '我的奖学金',
            redirect: '/bonus/index',
            children: [{
                    path: 'index',
                    component: BonusIndex,
                    name: 'BonusIndex',
                    meta: '奖学金中心',
                },
                {
                    path: 'bill',
                    component: BonusBill,
                    name: 'BonusBill',
                    meta: '奖学金明细',

                },
                {
                    path:'cash',
                    component: Cash,
                    redirect:'/bonus/cash/center',
                    children:[{
                        path:'center',
                        component:CashCneter,
                        name:'CashCneter',
                        meta:'我的奖学金'
                    },{
                        path:'bindcard',
                        component:BindBankcard,
                        name:'BindBankcard',
                        meta:'添加银行卡'
                    },{
                        path:'usercash',
                        component:userCash,
                        name:'userCash',
                        meta:'提现到银行卡'
                    },{
                        path:'record',
                        component:CashRecord,
                        name:'CashRecord',
                        meta:'提现记录'
                    }]
                }
            ]
        },
        {
            path: '/givingCourse',
            component: GivingCourse,
            name: 'GivingCourse',
            meta: '我的赠课'
        }, {
            path: '/receiveCourse',
            component: ReceiveCourse,
            name: 'ReceiveCourse',
            meta: '领取课程'
        },
        {
            path: '/receiveSuccess',
            component: ReceiveSuccess,
            name: 'receiveSuccess',
            meta: '领取成功'
        },
        {
            path: '/shareCourse',
            component: ShareCourse,
            name: 'ShareCourse',
            meta: '点击右上角按钮分享给朋友'
        },
        {
            path: '/coupon',
            component: UserCoupon,
            name: 'UserCoupon',
            meta: '优惠券',
        },
        {
            path:'/address',
            component:Address,
            name:'Address',
            meta:'我的地址',
            redirect: '/address/addressList',
            children:[{
                path:'addressList',
                component:AddressList,
                name:'AddressList',
                meta:'地址列表'
            },
            {
                path:'addAddress',
                component:AddAddress,
                name:'AddAddress',
                meta:'添加地址'
            },{
                path:'edit',
                component:EditAddress,
                name:'EditAddress',
                meta:'编辑地址'
            }
        ]
        },
        {
            path:'/order',
            component:OrderManage,
            name:'orderManage',
            redirect:'/order/list',
            children:[
                {
                    path:'unpay',
                    component:unpayOrder,
                    name:'unpayOrder',
                    meta:'未支付订单'
                },
                {
                    path:'list',
                    component:OrderList,
                    name:'OrderList',
                    meta:'订单列表'
                },
                {
                    path:'detail',
                    component:orderDetail,
                    name:'orderDetail',
                    meta:'订单详情'
                },
                {
                    path:'place',
                    component:OrderPage,
                    name:'OrderPage',
                    meta:'提交订单'
                }
            ]
        }
    ]
})