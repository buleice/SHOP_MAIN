<!--
  优惠券页面
 * @Description: In User Settings Edit
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-03 16:29:56
 * @LastEditTime: 2019-04-09 12:29:56
 -->

<template lang="html">
    <div class="coupon-page">
        <ul class="nav">
            <li :class="[tabIndex==0?'tabactive':'','tab']" @click='toggleTabs(0)'>未使用({{canuse.length}})</li>
            <li :class="[tabIndex==1?'tabactive':'','tab']" @click='toggleTabs(1)'>已使用({{hasused.length}})</li>
            <li :class="[tabIndex==2?'tabactive':'','tab']" @click='toggleTabs(2)'>已过期({{useless.length}})</li>
        </ul>
        <div v-if="coupons.length<=0" class="default-img">
            <img src="//udata.youban.com/webimg/wxyx/puintuan/double11_gift_noget.png" alt="">
            <p>{{alertContent}}</p>
        </div>
        <ul class="coupons" v-else>
            <li :class="[changeCouponStyle(coupon.lesson),'coupon']" v-for="coupon in coupons">
                <ul class="value">
                    <li>
                        <sub>&yen;</sub><span>{{coupon.couponMoney}}</span>
                    </li>
                    <li>
                        <span>满{{coupon.spendMoney}}元可用</span>
                    </li>
                </ul>
                <ul class="right">
                    <li class="info">
                        {{coupon.name}}
                    </li>
                    <li class="expiration" v-show="coupon.lesson!=''">
                        <span>仅用于：{{coupon.lesson}}</span>
                    </li>
                    <li class="expiration">
                        <span>有效期至：{{coupon.expiration}}</span>
                    </li>
                </ul>

                <!-- <a @click="$router.push({name:'UseCoupon',params:{couponId:coupon.id}})" class="exchange-btn">
          去使用
        </a> -->
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        GET_USER_COUPONS
    } from '../api/pageDataApis'
    export default {
        name: 'MyCoupons',
        data() {
            return {
                coupons: [],
                canuse: [],
                hasused: [],
                useless: [],
                tabIndex: 0,
                alertContent: '当前没有可用优惠券~~'
            }
        },
        created() {
            GET_USER_COUPONS({status:0}).then(response => {
                const res = response.data;
                this.coupons = res.list1;
                this.canuse = res.list1;
                this.hasused = res.list2;
                this.useless = res.list3;
            })
        },
        methods: {
            toggleTabs(index) {
                this.tabIndex = index;
                switch (index) {
                    case 0:
                        this.coupons = this.canuse, this.alertContent = '当前没有可用优惠券~~';
                        break;
                    case 1:
                        this.coupons = this.hasused, this.alertContent = '您还没有使用过的优惠券~~';
                        break;
                    case 2:
                        this.coupons = this.useless, this.alertContent = '暂无失效的优惠券~~';
                        break;
                    default:
                        return;
                }
            },
            changeCouponStyle(str) {
                switch (this.tabIndex) {
                    case 0:
                        if (str != '') return 'canuse';
                        else return 'canuse1';
                        break;
                    case 1:
                        return 'hasused';
                        break;
                    case 2:
                        return 'useless';
                        break;
                    default:
                        return 'canuse'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .coupon-page {
        .nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 2.81rem;
            background: #fff;
            border-bottom: 1px solid rgba(0, 0, 0, .2);

            .tab {
                line-height: 2.81rem;
                position: relative;
            }

            .tabactive {
                color: #f69f00;

                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    bottom: -2px;
                    height: 0;
                    width: 100%;
                    border-top: .13rem solid #f69f00;
                }
            }
        }

        .default-img {
            text-align: center;

            img {
                margin-top: 33%;
                width: 5rem;
            }
        }

        .coupons {
            width: 100%;
            padding: 0 1rem;
            box-sizing: border-box;
            margin-top: 1rem;

            .canuse {
                background: url("//udata.youban.com/webimg/wxyx/puintuan/canuse-coupon-bg2.png") no-repeat;
            }

            .canuse1 {
                background: url("//udata.youban.com/webimg/wxyx/puintuan/canuse-coupon-bg3.png") no-repeat;
            }

            .hasused {
                background: url("//udata.youban.com/webimg/wxyx/puintuan/used-coupon-bg2.png") no-repeat;
            }

            .useless {
                background: url("//udata.youban.com/webimg/wxyx/puintuan/nouse-coupon-bg2.png") no-repeat;
            }

            .coupon {
                width: 21.44rem;
                height: 6.25rem;
                background-size: 100% 100%;
                margin-bottom: 1.25rem;
                color: #fff;
                display: flex;
                justify-content: space-around;
                font-size: .75rem;

                ul {
                    box-sizing: border-box;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    &.value {
                        text-align: left;
                        width: 33%;

                        sub {
                            font-size: 1.2rem;
                        }

                        li:first-child {
                            span {
                                font-size: 2.5rem;
                            }
                        }

                        li {
                            margin-left: 1rem;
                        }
                    }

                    &.right {
                        width: 60%;
                        text-align: left;

                        li.expiration {
                            margin-top: .25rem;
                            color: #585858;
                        }

                        li.info {
                            font-size: 1.1rem;
                            margin-top: -0.2rem;
                            color: #000000;
                        }
                    }
                }
            }
        }
    }
</style>