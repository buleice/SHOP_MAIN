<!--
 * @Description:编辑地址 
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-04-03 16:53:50
 * @LastEditTime: 2019-04-09 14:35:58
 -->

<template>
  <div class="address">
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">收货人</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="addressInfo.name" type="text" placeholder="请输入收货人姓名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="addressInfo.phone" type="tel" placeholder="请输入手机号">
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
          style="background-color: rgb(204, 232, 207);" v-model="addressInfo.address"></textarea>
      </div>
    </div>
    <div class="weui-cell weui-cell_switch">
      <div class="weui-cell__bd">设为默认地址</div>
      <div class="weui-cell__ft">
        <van-switch v-model="addressInfo.default" active-color="#f69f00" inactive-color="#fdfdfd" />
      </div>
    </div>
    <div class="deleteButton" @click="deleteAdddress">删除该地址</div>

    <div class="mod_btns fixed"><a href="javascript:void(0);" @click="editSubmit" class="mod_btn bg_1">确认修改</a></div>
    <transition name="slide-into">
      <div v-if="showAreaList" class="arealist">
        <van-area :area-list="areaList" value="areaValuePicker" @confirm="pickerConfirm" @cancel="pickerCancle"
          @change="pickerChange" />
      </div>
    </transition>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    Field,
    CellGroup,
    Area,
    Switch
  } from 'vant';
  import {
    UPDATA_ADDRESS,
    DELETE_ADDRESS
  } from "../../api/pageDataApis";
  import areaList from '../../api/areaList'
  export default {
    name: "editAddress",
    data() {
      return {
        areaList: areaList,
        title: '所在地区：',
        showAddress: false,
        addressInfo: {},
        showPromptDialog: false,
        Faddress: [],
        showAreaList: false,
        location: '请选择地区',
        FgeoCode: [],
        areaValuePicker:'110101'
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.addressInfo == undefined) {
          vm.$router.back()
        }
        vm.addressInfo = JSON.parse(JSON.stringify(vm.shippingAddress[to.params.index]));
        vm.location=  vm.addressInfo.province + ' ' + vm.addressInfo.city + ' ' + vm.addressInfo.district;
        vm.areaValuePicker=vm.addressInfo.geoCode[2]
      })
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
      getName(value) {
        return value2name(value, ChinaAddressV4Data)
      },
      editSubmit() {
        let index = this.$route.params.index
        if (this.addressInfo.name.length <= 0) {
          this.$dialog.alert({
            message: '请输入符合姓名规范的收货人姓名'
          });
          return false;
          return false;
        } else if (!this.testPhoneNumber(this.addressInfo.phone.replace(/\s/g, ""))) {
          this.$dialog.alert({
            message: '请填写正确的手机号'
          });
          return false;
        } else if (this.addressInfo.geoCode.length < 1) {
          this.$dialog.alert({
            message: '请选择省市区地址'
          });
          return;
        } else if (this.addressInfo.address.length < 5) {
          this.$dialog.alert({
            message: '请填写详细地址如道路、门牌号、小区、楼栋号、单元室等'
          });
          return;
        } else {
          let postData;
          if (this.Faddress.length > 0) {
            postData = {
              Fname: this.addressInfo.name,
              Fphone: this.addressInfo.phone,
              Fprovince: this.Faddress[0],
              Fcity: this.Faddress[1],
              Fdistrict: this.Faddress[2],
              Faddress: this.addressInfo.address,
              Fdefault: this.addressInfo.default,
              id: this.shippingAddress[index].id,
              FgeoCode: this.addressInfo.geoCode
            }
          } else {
            postData = {
              Fname: this.addressInfo.name,
              Fphone: this.addressInfo.phone,
              Fprovince: this.addressInfo.province,
              Fcity: this.addressInfo.city,
              Fdistrict: this.addressInfo.district,
              Faddress: this.addressInfo.address,
              Fdefault: this.addressInfo.default,
              id: this.shippingAddress[index].id,
              FgeoCode: this.addressInfo.geoCode
            }
          }
          UPDATA_ADDRESS(postData).then(res => {
            let addressList = JSON.parse(JSON.stringify(this.shippingAddress));
            if (this.addressInfo.default == 1) {
              addressList.forEach((item, index) => {
                addressList[index] = Object.assign({}, item, {
                  default: 0
                });
              })
            }
            addressList[index] = Object.assign({}, this.shippingAddress[index], this.addressInfo, {
              province: this.Faddress[0],
              city: this.Faddress[1],
              district: this.Faddress[2]
            })
            if (res.data.rc == 0) {
              if (this.defaultAddress.id == this.shippingAddress[index].id) {
                this.setDefaultAddress(addressList[index]);
              }
              this.setShippingAddress(addressList);
              this.$router.back()
            }
          })
        }
      },
      pickerConfirm(res) {
             console.log(res)
        this.addressName = res;
        this.location = res[0].name + ' ' + res[1].name + ' ' + res[2].name;
        this.addressInfo.geoCode = res.reduce((arr, item) => {
          arr.push(item.code);
          return arr;
        }, [])
        this.showAreaList = false
      },
      pickerChange() {
        return
      },
      pickerCancle() {
        this.showAreaList = false
      },
      deleteAdddress() {
        const _this = this

        function beforeClose(action, done) {
          if (action === 'confirm') {
            let index = _this.$route.params.index;
            let addressId = _this.shippingAddress[index].id
            DELETE_ADDRESS({
              id: addressId
            }).then(res => {
              if (res.data.rc == 0) {
                let addressList = JSON.parse(JSON.stringify(_this.shippingAddress));
                addressList.splice(index, 1);
                _this.setShippingAddress(addressList);
                if (addressList.length > 0) {
                  if (_this.defaultAddress.id == addressId) {
                    _this.setDefaultAddress(addressList[0]);
                  } else {
                    _this.setDefaultAddress({});
                  }
                }
                _this.showPromptDialog = false;
                done()
                _this.$router.back();
              }
            })
          } else {
            done();
          }
        }
        this.$dialog.alert({
          title: '提示',
          message: '请确认是否删除该条地址？',
          showCancelButton: true,
          beforeClose
        });
      },
      ...mapActions('moduleAddress', ['setShippingAddress', 'setDefaultAddress'])
    },
    computed: {
      ...mapGetters('moduleAddress', ['shippingAddress', 'defaultAddress'])
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
  .deleteButton {
    height: 2.88rem;
    line-height: 2.88rem;
    /*border-radius: .25rem;*/
    text-align: left;
    padding-left: .94rem;
    background: #FFFFFF;
    color: #f69f00;
    margin: .5rem auto;
  }

  .fixed {
    left: 0;
    right: 0;
    max-width: 33.75rem;
    margin: 0 auto;
    background-color: #fff;
    position: fixed;
    z-index: 101;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .mod_btns {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    overflow: hidden;

    .mod_btn {
      display: block;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      min-width: 0;
      height: 2.88rem;
      line-height: 2.88rem;
      text-align: center;
      font-size: 1rem;
      position: relative;
    }

    .bg_1 {
      background: #ff4e09;
      color: #fff;
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