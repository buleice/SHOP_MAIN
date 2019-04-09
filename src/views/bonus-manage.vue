<!--
 * @Description: 奖学金页面
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-04 17:43:15
 * @LastEditTime: 2019-04-09 14:09:56
 -->

<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import {mixin} from '../mixins/index'
export default {
  name:'BonusManage',
  mixins: [mixin]
}
</script>
<style lang="css">
@import url(../common/css/weui.min.css);
div{
  text-align:left;
}
  .slide-into-enter {
    transform: translateY(100%);
  }

  .slide-into-enter-active {
    transition: transform .3s;
  }

  .slide-into-enter-to {
    transform: translateY(0);
  }

  .slide-into-leave {
    transform: translateY(0);
  }

  .slide-into-leave-active {
    transition: transform .3s;
  }

  .slide-into-leave-to {
    transform: translateY(100%);
  }

  .arealist {
    position: fixed;
    z-index: 1000;
    width: 100%;
    bottom: 0;
    left: 0;
  }
</style>
