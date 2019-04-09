<!--
 * @Description: 推送广告组件
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:40:30
 -->

<template>
  <div
    class="coupons"
    @click="showMe=false"
    v-if="showMe"
  >
    <div class="content">
      <h3>送给您一张</h3>
      <h2>{{ coupon.name }}</h2>
      <div class="coupon_bg">
        <p>{{ coupon.couponMoney }}<sub>元</sub></p>
        <p>适用于:<br>{{ coupon.lesson }}</p>
      </div>
    </div>

    <div
      class="close-coupon"
      @click="showMe=false"
    />
  </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
import { type } from 'os';

    export default {
        name: "PushComponent",
        props: {
            coupon:{
                type:Object,
                default:{}
            }
        },
        data() {
            return {
                text1: "新用户",
                showMe: true,
            }
        },
        computed: {
            ...mapGetters(['newUser'])
        }
    }
</script>

<style scoped lang="scss">
    .coupons {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        top: 0;
        bottom: 0;
        z-index: 100;

        .content {
            width: 21rem;
            height: 32rem;
            background: url('https://udata.youban.com/webimg/wxyx/puintuan/coupon.png') no-repeat;
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-48%, -50%);

            h3,
            h2 {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 4rem;
                color: #fff;
                font-size: 1rem;
                letter-spacing: 1px;
            }

            h2 {
                top: 5.4rem;
                color: #FFE345;
                text-shadow: 0px 2px 3px #B31712;
                font-size: 1.2rem;
            }

            .coupon_bg {
                position: absolute;
                background: url('https://udata.youban.com/webimg/wxyx/puintuan/coupon_bg.png') no-repeat center;
                width: 80%;
                height: 7rem;
                background-size: cover;
                top: 8rem;
                left: 50%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                display: flex;
                justify-content: space-around;
                align-items: center;

                p {
                    &:nth-child(1) {
                        font-size: 60px;
                        margin-left: 19px;
                        color: #F41C10;
                    }

                    sub {
                        font-size: 15px;
                        vertical-align: baseline;
                    }

                    &:nth-child(2) {
                        font-size: 0.6rem;
                        line-height: 1rem;
                        height: 2rem;
                    }
                }
            }

            .desc {
                color: #fb201e;
                position: absolute;
                height: 85px;
                top: 80px;
                width: 120px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                justify-content: space-between;
                align-items: end;
                font-size: 1rem;
                font-weight: 550;

                .shuli {
                    display: inline-block;
                    margin-right: 10px;
                    margin-top: auto;
                    width: 20px;
                    line-height: 16px;
                }

                span {
                    &:nth-child(2) {
                        font-size: 85px;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 7px;
                        font-weight: 500;
                    }

                    &:nth-child(3) {
                        font-size: 1.2rem;
                        margin-top: auto;
                    }
                }
            }

            .title {
                position: absolute;
                top: 215px;
                left: 50%;
                transform: translate(-55%, -50%);
                color: #fb201e;
            }
        }

        .close-coupon {
            background: url('//udata.youban.com/webimg/wxyx/puintuan/close-bg.png') no-repeat;
            background-size: 100%;
            position: absolute;
            width: 35px;
            height: 35px;
            bottom: 8rem;
            left: 50%;
            transform: translate(-48%, -50%);
        }

        .festival-close {
            background: url('//udata.youban.com/webimg/wxyx/puintuan/close-bg.png') no-repeat;
            background-size: 100%;
            position: absolute;
            width: 35px;
            height: 35px;
            bottom: 16%;
            left: 50%;
            right: 3.125rem;
            transform: translate(-50%, -50%);
        }

        .festival-close-btn {
            position: absolute;
            bottom: 29%;
            left: 50%;
            transform: translate(-50%, -50%);

            img {
                width: 75%;
            }
        }

        .festival {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-48%, -50%);
            width: 80%;
            display: block;
            margin: auto;
        }
    }
</style>