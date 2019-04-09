<!--
 * @Description: 商城页面
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:14:23
 -->
<template lang="html">
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
import {mixin} from '../mixins/index'
    export default {
        name: 'ShopDeault',
        mixins: [mixin]
    }
</script>
<style scoped lang="scss">

</style>
