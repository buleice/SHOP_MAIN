<!--
 * @Description: 添加地址
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-04-03 16:53:50
 * @LastEditTime: 2019-04-09 14:34:56
 -->

<template>
  <div class="address">
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">收货人</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="Fname" type="text" placeholder="请输入收货人姓名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="Fphone" type="tel" placeholder="请输入手机号">
        </div>
      </div>
      <div class="weui-cell" @click="showAreaList=true">
        <div class="weui-cell__hd"><label class="weui-label">地区</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" :value="location" disabled>
        </div>
      </div>
    </div>
    <div class="weui-cell vux-x-textarea">
      <div class="weui-cell__hd">
        <label class="weui-label" style="width: 6em;position: relative;
    top: -1.5rem;">详细信息：</label>
      </div>
      <div class="weui-cell__bd">
        <textarea autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          placeholder="如道路、门牌号、小区、楼栋号、单元室等" rows="3" cols="30" class="weui-textarea"
          style="background-color: rgb(204, 232, 207);" v-model="Faddress"></textarea>
      </div>
    </div>
    <div class="weui-cell weui-cell_switch">
      <div class="weui-cell__bd">设为默认地址</div>
      <div class="weui-cell__ft">
        <van-switch v-model="Fdefault" active-color="#f69f00" inactive-color="#fdfdfd" />
      </div>
    </div>
    <transition name="slide-into">
      <div v-if="showAreaList" class="arealist">
        <van-area :area-list="areaList" value="110101" @confirm="pickerConfirm" @cancel="pickerCancle"
          @change="pickerChange" />
      </div>
    </transition>
    <div class="mod_btns fixed"><a href="javascript:void(0);" @click="addAddressSubmit" class="mod_btn bg_1">确认</a>
    </div>
  </div>
</template>

<script>
  import {
    Field,
    CellGroup,
    Area,
    Switch
  } from 'vant';
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import {
    ADD_ADDRESS,
    GET_ADDRESS_LIST
  } from "../../api/pageDataApis";
  import areaList from '../../api/areaList'

  export default {
    name: "addAddress",
    data() {
      return {
        title: '提示',
        show: false,
        title: '所在地区：',
        addressName: [],
        Geocode: ["110000", "110100", "110101"],
        Fphone: '',
        Fname: '',
        Faddress: '',
        Fdefault: true,
        areaList: areaList,
        showAreaList: false,
        location: '请选择地区'
      }
    },
    methods: {
      testCardholder(holder) {
        let uPattern = /^[\u4E00-\u9FA5]{2,4}$/;
        return uPattern.test(holder);
      },
      testPhoneNumber(code) {
        let mPattern = /^1\d{10}$/; //http://caibaojian.com/regexp-example.html
        return mPattern.test(code);
      },
      addAddressSubmit() {
        if (this.Fname.length <= 0) {
          this.$dialog.alert({
            message: '请输入符合姓名规范的收货人姓名'
          });
          return false;
        } else if (!this.testPhoneNumber(this.Fphone.replace(/\s/g, ""))) {
          this.$dialog.alert({
            message: '请填写正确的手机号'
          });
          return false;
        } else if (this.Geocode.length < 1) {
          this.$dialog.alert({
            message: '请选择省市区地址'
          });
          return;
        } else if (this.Faddress.length < 5) {
          this.$dialog.alert({
            message: '请填写详细地址如道路、门牌号、小区、楼栋号、单元室等'
          });
          return;
        } else {
          let postData = {
            Fname: this.Fname,
            Fphone: this.Fphone,
            Fprovince: this.addressName[0].name,
            Fcity: this.addressName[1].name,
            Fdistrict: this.addressName[2].name,
            Faddress: this.Faddress,
            Fdefault: this.Fdefault,
            FgeoCode: this.Geocode.slice(0,3)
          }
          ADD_ADDRESS(postData).then(response => {
            const res = response.data;
            if (res.rc == 0) {
              if (this.$route.name == 'orderpage') {
                GET_ADDRESS_LIST().then(response => {
                  this.addressList = res.list;
                  this.setDefaultAddress(res.list[0]);
                  this.setShippingAddress(res.list);
                  this.$emit("submitorder");
                })
              } else {
                this.$router.back()
              }
            }
          })
        }
      },
      pickerConfirm(res) {
        this.addressName = res;
        this.location = res[0].name + ' ' + res[1].name + ' ' + res[2].name;
        this.Geocode = res.reduce((arr, item) => {
          arr.push(item.code);
          return arr;
        }, [])
        this.showAreaList = false
      },
      pickerChange(res) {
        return
      },
      pickerCancle() {
        this.showAreaList = false
      },
      ...mapActions('moduleAddress',['setShippingAddress', 'setDefaultAddress'])
    },
    components: {
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
      [Switch.name]: Switch,
      [Area.name]: Area
    },
  }
</script>
<style lang="scss" scoped>
  .address {
    .address-box {
      width: 100%;
      height: 2.81rem;
      overflow: hidden;
      position: relative;
    }

    .mod_btns {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      margin: .94rem .63rem;

      .mod_btn {
        border-color: #ddd;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        min-width: 0;
        height: 2.88rem;
        line-height: 2.88rem;
        text-align: center;
        font-size: 1rem;
        border-radius: .25rem;
        position: relative;
        border-radius: 0;
      }

      .mod_btn.bg_1 {
        background: #ff4e09;
        /*background: #e4393c;*/
        color: #fff;
      }
    }

    .fixed {
      left: 0;
      right: 0;
      max-width: 33.75rem;
      margin: 0 auto;
      background-color: #fff;
      position: relative;
      position: fixed;
      z-index: 500;
      bottom: 0;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
</style>
<style scoped>
  .address>>>.weui-cells {
    margin-top: 0 !important;
    font-size: .88rem;
  }

  .address>>>.weui-input {
    color: #666
  }

  .address>>>.weui-textarea {
    color: #666;
  }
</style>