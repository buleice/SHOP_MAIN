<template>
    <div class="coupons" @click="showMe=false" v-if="showMe&&!newUser">
        <!--<div class="content">-->
            <!--<h3>嗨！{{newUser?"新朋友":"老朋友"}}</h3>-->
            <!--<div class="desc">-->
                <!--<span class="shuli">送你</span>-->
                <!--<span>{{coupon.couponMoney}}</span>-->
                <!--<span>元</span>-->
            <!--</div>-->
            <!--<div class="title">{{coupon.name}}</div>-->
        <!--</div>-->
        <img class="festival"  src="//udata.youban.com/webimg/wxyx/push/festival.png" alt="">
        <!--<div class="close-coupon" @click="showMe=false"></div>-->
        <div class=" festival-close" @click="showMe=false"></div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "push-component",
        props: {
            coupon: {}
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
            width: 285px;
            height: 406px;
            background: url('//udata.youban.com/webimg/wxyx/puintuan/couponbg-new.png') no-repeat;
            background-size: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-48%, -50%);
            h3 {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 110px;
                color: #69160c;
            }
            .desc {
                color: #fb201e;
                position: absolute;
                height: 72px;
                top: 143px;
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
                        font-size: 72px;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 7px;
                        font-weight: 500;
                    }
                    &:nth-child(3) {
                        font-size: 1rem;
                        margin-top: auto;
                    }
                }
            }
            .title {
                position: absolute;
                top: 240px;
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
            top: 535px;
            left: 50%;
            transform: translate(-48%, -50%);
        }
        .festival-close{
            background: url('//udata.youban.com/webimg/wxyx/puintuan/close-bg.png') no-repeat;
            background-size: 100%;
            position: absolute;
            width: 35px;
            height: 35px;
            top:20%;
            right: 3.125rem;
            transform: translate(-48%, -50%);
        }
        .festival{
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-48%, -50%);
            width: 95%;
            display: block;margin: auto;
        }
    }

</style>
