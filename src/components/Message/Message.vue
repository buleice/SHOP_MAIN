<!--
 * @Description: 弹窗提示插件
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:18:22
 -->
<template>
  <transition name="fade">
    <!--<div class="message" :class="type" v-show="show">-->
    <!--<i class="icon"></i>-->
    <!--<span class="text">{{text}}</span>-->
    <!--</div>-->
    <div
      :class="['alert_dialog',type]"
      v-show="show"
    >
      <div class="weui-mask" />
      <div class="weui-dialog">
        <div class="weui-dialog__bd">{{ text }}</div>
        <div class="weui-dialog__ft">
          <a
            @click="show=false"
            class="weui-dialog__btn weui-dialog__btn_primary"
          >知道了</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'Message',
        props: {
            type: {
                type: String,
                default: 'info',
                validator: val => ['info', 'success', 'warning', 'error'].includes(val)
//['info', 'success', 'warning', 'error'] 表示type只接收这四个字符串作为参数传入message组件
            },
            text: {
                type: String,
                default: ''
            },
            show: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="stylus">
    $strong-text-color #99999
    $success-color
    $danger-color
    $warning-color
    // fade动画 <transition name="fade"> </transition>
    // 下面的样式可以自己改
    .fade-enter-active,
    .fade-leave-active
        transition: opacity .3s
    .fade-enter,
    .fade-leave-to
        opacity: 0
    .message
        position fixed
        top 40%;
        text-align center
        left 50%
        transform translateX(-50%)
        min-width :6rem;
        width auto;
        padding 10px 20px
        color $strong-text-color
        background #f5f5f5
        font-size 14px
        line-height 1.4
        border-radius 4px
        z-index 1000
        box-shadow 0 0 10px rgba(0, 0, 0, .3)
        &.info
            color $strong-text-color
        &.success
            color $success-color
        &.error
            color $danger-color
        &.warning
            color $warning-color
</style>

<style lang="scss" scoped>
    .alert_dialog {
        .weui-mask {
            position: fixed;
            z-index: 1000;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
        }
        .weui-dialog {
            position: fixed;
            z-index: 5000;
            width: 80%;
            max-width: 300px;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            background-color: #FFFFFF;
            text-align: center;
            border-radius: 3px;
            overflow: hidden;
        }
        .weui-dialog__bd:first-child {
            padding: 2.7em 20px 1.7em;
            color: #353535;
        }

        .weui-dialog__bd {
            padding: 0 1.6em 0.8em;
            min-height: 40px;
            font-size: 15px;
            line-height: 1.3;
            word-wrap: break-word;
            word-break: break-all;
            color: #808080;
        }
        .weui-dialog__ft {
            position: relative;
            line-height: 48px;
            font-size: 18px;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            .weui-dialog__btn_primary {
                color: #09BB07;
            }

            .weui-dialog__btn {
                display: block;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                color: #09BB07;
                text-decoration: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                position: relative;
            }
        }
    }
</style>
