<!--
 * @Description: 弹幕组件
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:39:03
 -->

<template lang="html">
  <ul class="danmaku" v-if="showDanMaku">
    <li class="danmaku_box danmaku_tip" v-html="danmakuText" />
  </ul>
</template>

<script>
  export default {
    name: 'Danmaku',
    props: {
      lists: {
        type: Array,
        default () {
          return []
        }
      },
    },
    data() {
      return {
        activeNum: 0,
        danmakuText: '分享课程即有机会获得奖学金',
        showDanMaku: false
      }
    },
    created() {

    },
    watch: {
      lists() {
        if (this.lists.length > 0) {
          this.showDanMaku = true;
          let initIndex = 0;
          setInterval(() => {
            this.danmakuText = this.lists[initIndex];
            initIndex++;
            if (initIndex >= this.lists.length) {
              initIndex = 0;
            }
          }, 4000)
        }
      }
    }

  }
</script>

<style lang="css" scoped>
  @keyframes ani_tip {
    0 {
      -webkit-transform: translateY(.9375rem);
      transform: translateY(.9375rem);
      opacity: 0
    }

    40% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1
    }

    65% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1
    }

    85% {
      -webkit-transform: translateY(-.9375rem);
      transform: translateY(-.9375rem);
      opacity: 0
    }

    100% {
      opacity: 0
    }
  }

  .danmaku_box {
    padding: 0 .2rem;
    height: 100%;
    opacity: 0;
    -webkit-transform: translateY(.9375rem);
    transform: translateY(.9375rem);
    color: #fff;
  }

  .danmaku_tip {
    animation: ani_tip 4s;
    animation-delay: 0s;
    animation-iteration-count: infinite
  }

  .danmaku_box {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: .8125rem;
    display: flex;
    align-items: center;
    vertical-align: middle;
    color: #3c3c3c
  }

  .danmaku_box>>>.name {
    max-width: 3.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
    margin-right: .3125rem
  }
</style>