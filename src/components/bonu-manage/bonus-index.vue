<!--
 * @Description: 奖学金中心
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:33:28
 -->

<template lang="html">
  <div class="bonus-page">
    <div class="myAcount">
      <div class="rule" @click="showGuize=true" />
      <div class="title-1">我的奖学金</div>
      <div class="balance">
        <span>{{ params.myBonus }}</span><sub>元</sub>
      </div>
      <div class="title-2"><span>当前总发放&nbsp;&nbsp;</span><span>{{ params.totalBonus }}</span><sub>元</sub></div>
      <div class="cash">
        <router-link to="/bonus/bill">查看明细</router-link><router-link to="/bonus/cash/center">提现</router-link>
      </div>
      <div class="danmaku-box">
        <img class="specker" src="../../assets/喇叭.png" alt="">
        <DanMaku :lists="barrage" />
      </div>
    </div>
    <nav>
      <li :class="{selected:tabIndex===0}" @click="changeTab(0)">本周最热</li>
      <li :class="{selected:tabIndex===1}" @click="changeTab(1)">最高奖学金</li>
      <div class="move" />
    </nav>
    <transition name="slide-right">
      <ul class="canGetCourses" v-if="tabIndex===0">
        <li v-for="(item,index) in params.hottest" :key="index">
          <a href="javascript:void(0);" @click="gotoUrl(item.url,item.title)">
            <img class="icon" v-lazy="item.img" :alt="item.title">
            <div class="infos">
              <div class="title" v-text="item.title" />
              <div class="bonus"><span>每次可得{{ Number(item.bonus) }}元</span></div>
              <div class="number">
                <span>{{ item.number }}人</span>获得
              </div>
            </div>

            <div class="button">
              马上分享
            </div>
            <img v-if="index<=2" class="label" :src="switchLabel(index)" alt="">
          </a>
        </li>
      </ul>
    </transition>
    <transition name="slide-left">
      <ul class="canGetCourses" v-if="tabIndex===1">
        <li v-for="(item,index) in params.highest" :key="index">
          <a href="javascript:void(0);" @click="gotoUrl(item.url,item.title)">
            <img class="icon" v-lazy="item.img" :alt="item.title">
            <div class="infos">
              <div class="title" v-text="item.title" />
              <div class="bonus"><span>每次可得{{ Number(item.bonus) }}元</span></div>
              <div class="number">
                <span>{{ item.number }}人</span>获得
              </div>
            </div>

            <div class="button">
              马上分享
            </div>
            <img v-if="index<=2" class="label" :src="switchLabel(index)" alt="">
          </a>
        </li>
      </ul>
    </transition>
    <transition name="fade">
      <div class="rule-pultop" v-if="showGuize">
        <div class="content" />
        <div class="closeBtn" @click="showGuize=false" />
      </div>
    </transition>
    <PushInfo v-if="showAd" />
  </div>
</template>

<script>
  import PushInfo from '../base/push-component/push-component'
  import {
    Request
  } from '../../common/js/request';
  import DanMaku from '../base/danmaku/danmaku'

  export default {
    name: 'BonusIndex',
    components: {
      DanMaku,
      PushInfo
    },
    data() {
      return {
        canGetCourses: [],
        bonus: 0,
        count: 0,
        showGuize: false,
        barrage: [],
        showAd: false,
        params: {},
        tabIndex: 0,
      }
    },
    created() {
      new Request("/shop/bonus.json", "POST").returnJson().then(res => {
        this.canGetCourses = res.data;
        this.bonus = res.bonus;
        this.count = res.count;
        this.barrage = res.barrage;
        this.params = res;
      })

    },
    methods: {
      gotoUrl: function (url) {
        window.location.href = url;
      },
      changeTab(index) {
        this.tabIndex = index;
      },
      switchLabel(index) {
        switch (index) {
          case 0:
            return require('../../assets/热门标签.png');
          case 1:
            return require('../../assets/热门标签2.png');
          case 2:
            return require('../../assets/热门标签3.png');
          default:
            return ''
        }
      }
    }
  }
</script>

<style media="screen">
  .subtitle p {
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 12rem;
    color: rgba(0, 0, 0, .5);
  }
</style>
<style lang="scss" scoped>
  @import "../../common/css/common";

  .myAcount {
    height: 9.6rem;
    background: #fda71d;
    background-size: 100% 100%;
    position: relative;

    .rule {
      position: absolute;
      top: 1.44rem;
      right: 1.44rem;
      width: 3.5rem;
      height: 3.5rem;
      background: url("../../assets/攻略.png") no-repeat;
      background-size: 100%;
    }

    .title-1 {
      padding-top: 1.4rem;
    }

    .title-2 {
      margin-top: .25rem;

      sub {
        font-size: .75rem;
      }
    }

    .title-1,
    .title-2 {
      border: 1px solid transparent;
      font-size: .8125rem;
      color: #a2430a;
      text-align: left;
      box-sizing: border-box;
      padding-left: 1.5rem;
    }

    .cash {
      position: absolute;
      bottom: 2.562rem;
      right: 1rem;
      display: block;
      padding-right: 1.25rem;
      font-size: .875rem;

      a {
        color: #ffffff;
        text-decoration: underline;
        margin: 0 .5rem;
      }
    }

    .balance {
      border-top: 1px solid rgba(0, 0, 0, 0);
      text-align: left;
      color: #ffffff;
      margin-left: 1.5rem;

      span {
        font-size: 2.125rem;
        margin-right: 0.19rem;
        font-weight: 700;
      }

      sub {
        font-size: 1rem;
      }
    }

    .btn {
      width: 7rem;
      margin: 0.94rem auto 0;
      height: 2.13rem;
      font-size: 1rem;
      background-color: #ff4e09;
      line-height: 2.13rem;
      text-align: center;
      border-radius: 1.06rem;
      // padding: 0 0.63rem;
      color: #fff;
    }

    .danmaku-box {
      width: 16.31rem;
      height: 2.875rem;
      background: #fff;
      position: absolute;
      bottom: -1.43rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      height: 2.5rem;
      display: flex;
      align-items: center;
      @include card-shadow;
      border-radius: 2rem;

      img.specker {
        height: 1.3rem;
        margin-left: 1.5rem;
      }
    }
  }

  nav {
    width: 12.465rem;
    display: flex;
    justify-content: center;
    margin: 2.56rem auto 2.125rem;
    position: relative;

    li {
      margin: 0 1rem;
      position: relative;

      &:nth-child(1) {
        &.selected {
          &~.move {
            left: 1rem;
            width: 4rem;
          }
        }
      }

      &:nth-child(2) {
        &.selected {
          &~.move {
            width: 5rem;
            right: 1rem;
          }
        }
      }
    }

    .move {
      height: 2px;
      border-top: 2px solid #f69900;
      /*只需要将上边显示出来*/
      position: absolute;
      top: 1.25rem;
      transition: all .5s ease-in-out 0s;
      /*包含四个过度属性：执行变换属性、执行时间、速率、延迟*/
    }
  }

  .canGetCourses {
    li {
      width: 94%;
      height: 5.5625rem;
      background: #ffffff;
      border-radius: 10px;
      margin: 0 auto 2rem;
      position: relative;
      @include card-shadow;

      a {
        color: #2c3e50;
        display: block;
        height: 100%;

        img.icon {
          width: 5.3125rem;
          height: 5.3125rem;
          border-radius: 10px;
          border: none;
          position: absolute;
          top: -.5rem;
          left: 0.63rem;
        }

        .infos {
          position: absolute;
          left: 6.75rem;
          width: 13rem;
          box-sizing: border-box;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .title {
            font-size: .8125rem;
            line-height: 1.56rem;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: .5rem;
          }

          .bonus {
            margin-top: .25rem;
            transform: translateX(-1%);

            &>span {
              display: inline-block;
              padding: .1rem .4rem;
              font-size: .625rem;
              color: #787878;
              border-radius: 0.81rem;
              border: 1px solid currentColor;
            }
          }

          .number {
            color: #787878;
            font-size: .875rem;
            margin-top: .25rem;

            span {
              color: #FF4E09;
            }
          }

        }

        .button {
          display: inline-block;
          border-radius: 10px;
          padding: .3rem .5rem;
          background: #f69900;
          color: #ffffff;
          font-size: .8125rem;
          position: absolute;
          right: 0.625rem;
          bottom: .9rem;
        }

        .label {
          position: absolute;
          width: 1.5rem;
          top: -.625rem;
          right: -4px;
        }
      }
    }
  }

  .rule-pultop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 5;

    .content {
      background: url("//udata.youban.com/webimg/wxyx/puintuan/bonus_rule.png") no-repeat;
      background-size: 100% 100%;
      width: 20.8rem;
      height: 26.43rem;
      margin: auto;
      margin-top: 2.875rem;
    }

    .closeBtn {
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      background: url("//udata.youban.com/webimg/wxyx/puintuan/close_button.png") no-repeat;
      background-size: 100% 100%;
      margin: auto;
      margin-top: 1rem;
    }

  }
</style>