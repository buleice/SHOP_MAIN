/*
 * @Description: 默认分享混合
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-01 10:55:25
 * @LastEditTime: 2019-04-09 14:21:26
 */

import {wxShare} from '../api/wx-share'
var mixin={
    beforeRouteEnter (to, from, next) {
        wxShare({
            title: `${window.localStorage.count||1359}位朋友正在小伴龙优学参与拼课，快为宝宝报名有趣的课程吧!`,
            desc: '这里的课程生动有趣，快来小伴龙优学陪伴孩子快乐成长吧！',
            link: 'https://wxyx.youban.com/shop/index?from=default',
            imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/shop-icon.png',
        })
        next();
    }
}
export{
    mixin
}