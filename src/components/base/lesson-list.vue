<!--
 * @Description: 课程列表组件
 * @Author: dylan
 * @github: http://git.youban.com:9527/busy/wxyx.git
 * @LastEditors: dylan
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:41:40
 -->

<template lang="html">
  <div class="">
    <ul class="item">
      <li
        v-for="(item,index) in lessonList"
        :key="index"
      >
        <div class="tuanimg">
          <a
            :href="item.url"
            target="_blank"
          >
            <img
              class="course-img"
              @load="imgLoad"
              ref="lazy"
              v-lazy="item['banner']"
              :key="item['banner']"
            >
          </a>
          <div class="people">
            {{ item['sales'] }}人正在学习
          </div>
        </div>
        <div class="tuanTitle">{{ item['title'] }}</div>
        <div class="tuanInfo">
          <div
            class="Infotag"
            v-if="item['label'].length>0"
          >
            <span>{{ splitlabel(item['label'])[0] }}</span>
            <span>{{ splitlabel(item['label'])[1] }}</span>
          </div>
          <div class="price">
            <a
              class="detailbtn"
              :href="item.url"
              target="_blank"
            >
              <span><strong>去学习</strong></span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: "LessonList",
        props: {
            lessonList: {},
            isNew: 0
        },
        methods: {
            renderLabel: function (Ftag) {
                switch (Ftag) {
                    case 1:
                        return '//udata.youban.com/webimg/wxyx/puintuan/newest.png';
                    case 2:
                        return '//udata.youban.com/webimg/wxyx/puintuan/hotst.png';
                    case 3:
                        return '//udata.youban.com/webimg/wxyx/puintuan/free.png';
                    case 4:
                        return '//udata.youban.com/webimg/wxyx/puintuan/recommend.png';
                    case 5:
                        return '//udata.youban.com/webimg/wxyx/puintuan/xianmian.png';
                    default:
                        return ''
                }
            },
            splitlabel(str) {
                if (str) {
                    return str.split('/');
                }
            },
            imgLoad() {
                this.$emit('imgLoad')
            },
            ...mapActions(['setScrollRefresh'])
        },
        computed: {
            ...mapGetters(['isScrollRefresh'])
        }
    }
</script>

<style media="screen" lang="scss" scoped>
    @import "../../common/css/common";

    .item {
        overflow: hidden;
        padding: 0.625rem;
        position: relative;

        li {
            overflow: hidden;
            display: block;
            background-color: #fff;
            border-radius: 0.625rem;
            margin-bottom: 0.8125rem;
            -webkit-box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, .2);
            box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, .2);

            .tuanimg {
                position: relative;

                a {
                    display: block;
                    border-radius: 0.625rem 0.625rem 0 0;
                    overflow: hidden;

                    .tuan-label {
                        position: absolute;
                        width: 22%;
                        height: auto;
                        left: 0;
                        top: 0;
                    }

                    .course-img {
                        width: 100%;
                        height: auto;
                        max-height: 10.65rem;
                    }
                }

                .people {
                    position: absolute;
                    right: 0;
                    top: 0.8rem;
                    width: auto;
                    height: 1.5rem;
                    padding: 0 0.5rem;
                    line-height: 1.5rem;
                    text-align: center;
                    background: rgba(0, 0, 0, .3);
                    border-radius: 0.75rem 0 0 0.75rem;
                    color: #FFF;
                }
            }

            .tuanTitle {
                padding: 0.625rem 0.625rem 0;
                height: auto;
                overflow: hidden;
                font-size: 1rem;
                text-align: left;

            }

            .tuanInfo {
                padding: 0 0.625rem 0.625rem;
                height: auto;
                overflow: hidden;
                position: relative;

                .Infotag {
                    float: left;
                    width: 38%;
                    padding-top: 0.625rem;
                    margin-left: -.5rem;

                    span {
                        @include circle-label;
                        color: $font-color-info;

                        &:first-child {
                            margin-right: 0.375rem;
                        }
                    }
                }

                .price {
                    float: right;
                    display: flex;
                    align-items: center;
                    margin-top: 0.5rem;

                    em {
                        font-size: 1rem;
                        margin-right: 0.625rem;
                    }

                    .detailbtn {
                        display: inline-block;
                        background-color: #f69f00;
                        width: 4.1875rem;
                        line-height: 1.625rem;
                        border-radius: .63rem;
                        text-align: center;
                        background-color: #f69f00;
                        color: #fff;
                        text-decoration: none;
                        max-width: 7.63rem;
                        overflow: hidden;

                        strong {
                            font-size: 1rem;
                            font-weight: normal;
                        }
                    }
                }
            }

        }

    }
</style>