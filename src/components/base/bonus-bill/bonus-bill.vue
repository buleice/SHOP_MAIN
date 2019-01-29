<template lang="html">
  <table v-if="bill.length>0">
    <tr  v-for="(item,index) in bill" :key="index">
      <td align="center" valign="middle">
        {{item.time.slice(0,10)}}
      </td>
      <td>
        {{item.title}}
      </td>
      <td>{{item.bonus}}</td>
    </tr>
  </table>
  <div v-else class="default-img">
    <img src="//udata.youban.com/webimg/wxyx/puintuan/double11_gift_noget.png" style="margin-top:33%;" alt="">
    <p style="font-size:1.25rem;">还未获得奖学金哦~~</p>
  </div>
</template>

<script>
import {
  Request
} from '../../../api/request'
export default {
  name: 'BonusBill',
  data() {
    return {
      bill: [],
    }
  },
  created() {
    new Request('/bonus/detail.json', "POST").returnJson().then(res => {
      this.bill = res.list;
    })
  }
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    tr {
        width: 100%;
        height: 4.25rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
        td {
            &:first-child {
                width: 7rem;
                img {
                    width: 2.81rem;
                    border-radius: 50%;
                }
            }
            &:nth-child(2) {
                width: auto;
                max-width: 8rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 0.88rem;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            &:last-child {
                font-size: 0.88rem;
              text-align: center;
              /*text-indent: 1rem;*/
            }
        }
    }
}
.default-img{
  text-align: center;
  img{
    margin-top:33%;
    width: 5rem;
  }
}
</style>
