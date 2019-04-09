<!--
 * @Description: 奖学金提现
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-04-08 14:21:41
 * @LastEditTime: 2019-04-09 14:34:22
 -->

<template lang="html">
  <div class="bonus">
    <router-view />
  </div>
</template>

<script>
import {mixin} from '../../mixins/index'
export default {
name:'BonusPage',
        mixins: [mixin]
}
</script>

<style lang="scss" scoped>
  .bonus{
       outline: 9999px solid #f5f5f5;
  }
</style>
<style lang="css">
@import url(../../common/css/weui.min.css);
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
