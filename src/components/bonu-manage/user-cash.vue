<!--
 * @Description: 发起奖学金提现 
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-04-04 17:45:27
 * @LastEditTime: 2019-04-09 14:34:45
 -->

<template lang="html">
  <div class="user-cash">
    <div class="withdraw">
      <h3>提现金额</h3>
      <div class="input_box" @click="ChangeShowKeyBoard">
        <!-- <input type="number" v-model="wantCash" :max="cancash" pattern="[0-9]*" name="" value="" disabled> -->
        <div class='input-box'>{{wantCash}}</div>
        <div class="withdraw-all" @click.stop="changeWantCash">全部提现</div>
      </div>
      <div class="info">
        最多可提取{{cancash}}元
      </div>
    </div>
    <div class="submit_button" @click="cashMoney()">提现</div>
    <div class="js_dialog" id="iosDialog2" v-if="isAlert" style="opacity: 1;">
      <div class="weui-mask" @click="isAlert=false"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">{{alertContent}}</div>
        <div class="weui-dialog__ft">
          <a @click="isAlert=false" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
        </div>
      </div>
    </div>
    <transition name="slide-into">
      <van-number-keyboard :show="showKeyBoard" extra-key="." close-button-text="完成" @blur="showKeyBoard = false"
        @input="onInput" @delete="onDelete" />
    </transition>
  </div>
</template>
<script>
  import {
    NumberKeyboard
  } from 'vant';
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    CASH_MONEY
  } from '../../api/pageDataApis'
  export default {
    name: 'withdrawtowallet',
    components: {
      [NumberKeyboard.name]: NumberKeyboard
    },
    data() {
      return {
        isAlert: false,
        alertContent: '',
        showKeyBoard: true,
      }
    },
    methods: {
      cashMoney() {
        if (typeof (Number(this.wantCash)) && !isNaN(Number(this.wantCash))) {
          if (this.wantCash <= this.cancash) {
            if (this.wantCash >= 20) {
              CASH_MONEY({
                sum: this.wantCash
              }).then(Response => {
                const res = Response.data;
                if (Response.rc == 0) {
                  this.setCanCash(this.cancash - this.wantCash);
                  this.alertContent = "提现成功，将于12月10日到账,敬请关注！";
                  this.isAlert = true;
                  let _this = this
                  setTimeout(function () {
                    _this.$router.push({
                      path: '/mybonuscandraw'
                    })
                  }, 300)
                } else {
                  this.alertContent = res.body.msg;
                  this.isAlert = true;
                }
              })
            } else {
              this.alertContent = "每次至少20元才可提现";
              this.showKeyBoard = true;
              this.isAlert = true;
              this.setWantCash(0);
              return false;
            }
          } else {
            this.alertContent = "账户最多可提取" + this.cancash + "元";
            this.showKeyBoard = true;
            this.setWantCash(0);
            this.isAlert = true;
          }
        } else {
          this.alertContent = "请输入正确的数字";
          this.showKeyBoard = true;
          this.isAlert = true;
          this.setWantCash(0);
        }

      },
      isNumber(obj) {
        if (typeof Number(obj) === 'number' && !isNaN(Number(obj))) {
          this.alertContent = "请输入正确的数字";
          this.isAlert = true;
          this.setWantCash(0);
        }
      },
      onInput(value) {
        let num = value;
        //不同按键处理逻辑
        // -1 代表无效按键，直接返回
        if (num == -1) return false;
        switch (String(num)) {
          //小数点
          case '.':
            this._handleDecimalPoint();
            break;
          default:
            this._handleNumberKey(num);
            break;
        }
      },
      onDelete() {
        this._handleDeleteKey();
      },
      //处理小数点函数
      _handleDecimalPoint() {
        //如果包含小数点，直接返回
        if (String(this.wantCash).indexOf('.') > -1) return false;
        //如果小数点是第一位，补0
        if (!String(this.wantCash).length)
          this.setWantCash('0.');
        //如果不是，添加一个小数点
        else
          this.setWantCash(this.wantCash + '.');
      },
      //处理删除键
      _handleDeleteKey() {
        let S = String(this.wantCash);
        //如果没有输入，直接返回
        if (!S.length) return false;
        //否则删除最后一个
        this.setWantCash(S.substring(0, S.length - 1));
      },

      //处理数字
      _handleNumberKey(num) {
        let S = String(this.wantCash);
        //如果有小数点且小数点位数不小于2
        if (S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
          this.setWantCash(S + num);
        //没有小数点
        if (!(S.indexOf('.') > -1)) {
          //如果第一位是0，只能输入小数点
          if (num == 0 && S.length == 0)
            this.setWantCash('0.');
          else {
            this.setWantCash(S + num);
          }
        }
      },
      changeWantCash() {
        this.setWantCash(this.cancash)
      },
      ChangeShowKeyBoard() {
        this.showKeyBoard = true
      },
      ...mapActions('moduleBinkCard', ['setCanCash', 'setWantCash'])
    },
    computed: {
      ...mapGetters('moduleBinkCard', ["cancash", 'wantCash'])
    }
  }
</script>
<style lang="css" scoped>
  .user-cash {
    text-align: left;
  }

  .withdraw {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 .63rem;
    padding-top: 1.25rem
  }

  h3 {
    font-weight: 500;
  }

  .input_box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 21.88rem;
    height: 2rem;
    border-bottom: 2px solid #f5f5f5;
    margin: auto;
    margin-top: 1.56rem
  }

  input[type] {
    width: 16.88rem;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1rem
  }

  .withdraw-all {
    width: 84px;
    height: 100%;
    text-align: center;
    color: #1dacaa
  }

  .info {
    height: 38px;
    line-height: 2.38rem;
    font-size: .88rem;
    color: #a3a3a3
  }

  .submit_button {
    width: 8.75rem;
    height: 2.5rem;
    text-align: center;
    color: #fff;
    background-color: #ffa922;
    line-height: 2.5rem;
    border-radius: 20px;
    margin: 1.56rem auto 0;
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
</style>