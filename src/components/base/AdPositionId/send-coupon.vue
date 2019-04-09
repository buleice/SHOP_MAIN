<!--
 * @Description: 赠送优惠券弹窗
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:37:08
 -->

<template>
  <div class="coupons" />
</template>

<script>
    export default {
        name: "SendCoupon"
    }
</script>

<style scoped lang="scss">
.coupons{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    top: 0;
    bottom: 0;
    z-index: 100;
}
</style>
