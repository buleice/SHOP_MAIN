/*
 * @Description: 微信分享封装
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-03-28 15:21:15
 * @LastEditTime: 2019-04-09 14:46:10
 */

import {
  Request
} from '../common/js/request';
import {
  axiosPost
} from '../common/js/axiosData'
const apilist = [
  'onMenuShareTimeline',
  'onMenuShareQQ',
  'onMenuShareAppMessage',
  'onMenuShareWeibo',
  'onMenuShareQZone'
]
export function wxShare(data) {
  const newData = data;
  newData.success = function () {
      new Request('/common/record.json?wxschool=detail', "GET").returnJson()
    },
  axiosPost('/weixin/config', {
    url: window.location.href.split('#')[0]
  }).then(res => {
    let data = res.data;
    window.wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: apilist
    });
    window.wx.ready(function () {
      window.wx.onMenuShareAppMessage(newData);
      window.wx.onMenuShareTimeline(newData); //朋友圈
    });
    window.wx.error(function (res) {
      console.log('微信：', JSON.stringify(res));
    });
  })
}