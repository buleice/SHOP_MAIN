<!--
 * @Description: 课程领取成功页面
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:20:13
 -->
<template>
    <div>
        <div class="receive-course">
            <!-- <div class="qrcode" ref="qrcode">
                <qrcode-vue :value="value" level="H"></qrcode-vue>
            </div> -->
            <div class="qr-box">
                <img src="//udata.youban.com/webimg/wxyx/puintuan/qrcode_for_gh_9342f35f8d94_344.png" class="QR-img" alt="二维码">
            </div>
            <div class="info">关注优学公众号去上课</div>
        </div>
    </div>
</template>
<script>
    // import QrcodeVue from 'qrcode.vue';
    import {
        wxShare
    } from '../../api/wx-share';
    export default {
        name: 'receive-course',
        mounted() {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 通过下面这个API隐藏右上角按钮
                WeixinJSBridge.call('hideOptionMenu');
            });
            // this.$nextTick(() => {
            //     this.Qrcode = this.$refs.qrcode.children[0].children[0].toDataURL('image/jpeg')
            // })

        },
        beforeDestroy() {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 通过下面这个API显示右上角按钮
                WeixinJSBridge.call('showOptionMenu');
            });
        },
        components: {
            // QrcodeVue
        }
    }
</script>
<style lang="scss" scoped>
    @import url(../../common/css/common.scss);

    .receive-course {
        width: 100%;
        height: 0;
        padding-top: 178%;
        background: url('//udata.youban.com/webimg/wxyx/puintuan/receive-success-bg.png') no-repeat;
        background-size: 100% auto;
        position: relative;
        margin-top: -3.9rem;

        .qrcode {
            position: absolute;
            top: 13.1rem;
            left: 50%;
            transform: translateX(-50%);
            border: 2px solid #ffb541;
            border-radius: 5px;
            opacity: 0;

            /deep/ canvas {
                width: 7.93rem !important;
                height: 7.93rem !important;
                border-radius: 5px;
                border: .5rem solid #ffffff;
            }
        }

        .qr-box {
            position: absolute;
            top: 13.1rem;
            left: 50%;
            transform: translateX(-50%);
            border: 2px solid #ffb541;
            border-radius: 5px;
            .QR-img {
                width: 8.43rem ;
                height: 8.43rem ;
                border-radius: 5px;
            }
        }


        .info {
            position: absolute;
            top: 23.1rem;
            left: 50%;
            transform: translateX(-50%);
            color: #ffffff;
        }
    }
</style>